// // order-update-consumer.service.ts
// import { Injectable } from '@nestjs/common';
// import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
// import { SmartContractService } from '../common/smart-contract.service';
// import { OrdersService } from './orders.service';

// @Injectable()
// export class OrderUpdateConsumerService {
//   constructor(
//     private readonly smartContractService: SmartContractService,
//     private readonly ordersService: OrdersService,
//   ) {}

//   @RabbitSubscribe({
//     exchange: 'order-exchange',
//     routingKey: 'process-order',
//     queue: 'order-processing-queue',
//   })
//   public async handleOrderUpdate(message: { orderId: number }) {
//     const { orderId } = message;
//     console.log(`Received order update for orderId: ${orderId}`);

//     try {
//       // Call the smart contract to get the invoice ID
//       const invoiceId = await this.smartContractService.getInvoiceIdByOrderId(orderId);
      
//       // Update the order in the database with the invoiceId
//       await this.ordersService.updateOrderInvoiceId(orderId, invoiceId);
      
//       console.log(`Order with orderId: ${orderId} has been updated with invoiceId: ${invoiceId}`);
//     } catch (error) {
//       console.error(`Error processing order update for orderId: ${orderId}`, error);
//       // Additional error handling as required
//     }
//   }
// }
