// import { Injectable } from '@nestjs/common';
// import { AmqpConnection } from '@nestjs-plus/rabbitmq';
// import { Order } from './schemas/order.schema';

// @Injectable()
// export class OrderUpdatePublisherService {
//   constructor(private readonly amqpConnection: AmqpConnection) {
//     console.log("********************OrderUpdatePublisherService Service HIT")
//   }

//   async publishOrderUpdate(order: Order) {
//     if (order.shipped && order.invoiceId === null) {
//       await this.amqpConnection.publish('order-exchange', 'order-update', {
//         orderId: order.id,
//       });
//     }
//   }
// }

