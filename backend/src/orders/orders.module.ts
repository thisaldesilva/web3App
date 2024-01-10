import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmartContractService } from 'src/common/smart-contract.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schemas/order.schema';
//import { OrderUpdatePublisherService } from './order-update-producer-service'
//import { RabbitMQModule } from '../common/rabbitMQ/rabbitmq.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), 
        //RabbitMQModule
    ],
    controllers: [OrdersController], 
    providers: [OrdersService, SmartContractService],
    exports: [OrdersService]
})
export class OrdersModule {}
