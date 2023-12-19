// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as amqp from 'amqplib';
// import { OrdersService } from '../../orders/';

// @Injectable()
// export class RabbitMQConsumer implements OnModuleInit {
//   private channel: amqp.Channel;

//   constructor(private ordersService: OrdersService) {}

//   async onModuleInit() {
//     const connection = await amqp.connect('amqp://localhost');
//     this.channel = await connection.createChannel();

//     await this.channel.consume('orders_queue', async (msg) => {
//       if (msg) {
//         const orderId = parseInt(msg.content.toString());
//         await this.ordersService.updateOrder(orderId);
//         this.channel.ack(msg);
//       }
//     });
//   }
// }
