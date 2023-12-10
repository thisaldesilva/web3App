import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmartContractService } from '../common/smart-contract.service';
import { Order } from './schemas/order.schema';
//import { OrderUpdatePublisherService } from './order-update-producer-service'

@Injectable()
export class OrdersService {

    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>, private smartContractService: SmartContractService) {}

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

    async markOrderAsShipped(orderId: string): Promise<Order> {
        const order = await this.orderModel.findOne({ id: orderId }).exec(); 
        const req = await this.smartContractService.shipWheat((await order).bakerAddress, (await order).quantity, (await order).quantity*100)
    

        const invoiceId = await this.smartContractService.getCurrentInvoiceId();
        console.log("Invoice ID -> ", invoiceId)
        
        const updatedOrder = await this.orderModel.findOneAndUpdate({ id: orderId }, { $set: { shipped: true,  invoiceId: invoiceId } }, { new: true }).exec();
        
        // Publish update to RabbitMQ
        // await this.orderUpdatePublisherService.publishOrderUpdate(order)
        return updatedOrder
    }

    updateOrderInvoiceId(orderId: number, invoiceId: any) {
        return this.orderModel.findOneAndUpdate({ id: orderId }, { $set: { invoiceId: invoiceId } }, { new: true }).exec();
    }

}