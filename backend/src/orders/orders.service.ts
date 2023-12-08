import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

    async createOrder(orderData: any): Promise<Order> {
        const newOrder = new this.orderModel(orderData);
        return newOrder.save();
    }

    async findAllOrders(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOrdersByBaker(bakerId: string): Promise<Order[]> {
        return this.orderModel.find({ requested_backer_id: bakerId }).exec();
    }

    // async deleteOrder(orderId: string): Promise<any> {
    //     return this.orderModel.findByIdAndRemove(orderId).exec();
    // }

    async markOrderAsShipped(orderId: string): Promise<Order> {

        return this.orderModel.findOneAndUpdate({ id: orderId }, { $set: { shipped: true } }, { new: true }).exec();

    }
}