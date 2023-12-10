import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmartContractService } from 'src/common/smart-contract.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schemas/order.schema';
//import { OrderUpdatePublisherService } from './order-update-producer-service'

import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), 
        // RabbitMQModule.forRoot({
        //     exchanges: [
        //       {
        //         name: 'order-exchange',
        //         type: 'direct',
        //       },
        //     ],
        //     uri: 'amqp://guest:guest@localhost:5672', // Update with global config
        //   }),    
    ],
    controllers: [OrdersController],
    providers: [OrdersService, SmartContractService]
})
export class OrdersModule {}
