import { forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmartContractService } from '../common/smart-contract.service';
import { Order } from './schemas/order.schema';
//import { OrderUpdatePublisherService } from './order-update-producer-service'
//import { RabbitMQProducer } from '../common/rabbitMQ/rabbitmq.producer';
import { CreateOrderDto } from './dto/create.order.dto';
import { OrderStatus as Status } from '../common/enums/order-status.enum'
import { privateDecrypt } from 'crypto';

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        @Inject(forwardRef(() => SmartContractService)) 
        private smartContractService: SmartContractService) {}

    async createOrder(orderData: any): Promise<Order> {
        const newOrder = new this.orderModel(orderData);
        return newOrder.save();
    }

    async findAllOrders(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOrdersByBaker(bakerId: string): Promise<Order[]> {
        const res = await this.orderModel.find({ requested_backer_id: bakerId }).exec();
        return res
    }

    async markOrderAsAccepted(orderId: string, price: number): Promise<Order> {
        this.updateOrderStatus(orderId, Status.Accepted)
        return this.updateUnitPrice(orderId, price)
    }

    async markOrderAsShipped(orderId: string): Promise<Order> {
        const order = await this.orderModel.findOne({ id: orderId }).exec(); 
        const price = (await order).quantity * (await order).unitPrice;
        this.smartContractService.shipWheat((await order).bakerAddress, (await order).id, (await order).quantity, price)
    
        // const invoiceId = await this.smartContractService.getCurrentInvoiceId();
        // console.log("Invoice ID -> ", invoiceId)
        
        return this.updateOrderStatus(orderId, Status.RecordingOnBlockchain);
    }

    updateOrderInvoiceId(orderId: number, invoiceId: any) {
        return this.orderModel.findOneAndUpdate({ id: orderId }, { $set: { invoiceId: invoiceId } }, { new: true }).exec();
    }

    async updateOrderStatus(orderId: string, newStatus: Status): Promise<Order> {
        const order = await this.orderModel.findOne({ id: orderId }).exec();

        if (!order) {
            throw new Error('Order not found');
        }

        if (!this.isStatusTransitionValid(order.status, newStatus)) {
            throw new Error('Invalid status transition');
        }

        order.status = newStatus;
        return order.save();
    }

    async updateUnitPrice(orderId: string, unitPrice: number): Promise<Order> {
        const order = await this.orderModel.findOne({ id: orderId }).exec();

        if (!order) {
            throw new Error('Order not found');
        }

        order.unitPrice = unitPrice;
        return order.save();
    }

    async updateOrderStatusAndInvoiceId(orderId: number, newStatus: Status, invoiceId: number): Promise<Order> {
        const order = await this.orderModel.findOne({ id: orderId }).exec();
        if (!order) {
          throw new Error('Order not found');
        }
        
        if (!this.isStatusTransitionValid(order.status, newStatus)) {
          throw new Error('Invalid status transition');
        }
    
        order.status = newStatus;
        order.invoiceId = invoiceId;
        return order.save();
    }

    private isStatusTransitionValid(currentStatus: Status, newStatus: Status): boolean {
        const validTransitions = {
            [Status.Requested]: [Status.Accepted],
            [Status.Accepted]: [Status.RecordingOnBlockchain],
            [Status.RecordingOnBlockchain]: [Status.Shipped],
            [Status.Shipped]: [Status.OrderReceived]
        };

        return validTransitions[currentStatus]?.includes(newStatus) || false;
    }

}