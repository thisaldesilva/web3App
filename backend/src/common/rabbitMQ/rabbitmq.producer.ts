import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQProducer {
  private channel: amqp.Channel;

  constructor() {
    this.init();
  }

  private async init() {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();

    await this.channel.assertExchange('delayed_exchange', 'x-delayed-message', {
      durable: true,
      arguments: { 'x-delayed-type': 'direct' },
    });
    await this.channel.assertQueue('orders_queue', { durable: true });
    await this.channel.bindQueue('orders_queue', 'delayed_exchange', '');
  }

  async publishDelayedMessage(orderId: number) {
    const message = Buffer.from(orderId.toString());
    this.channel.publish('delayed_exchange', '', message, {
      headers: { 'x-delay': 30000 } // Delay of 30 seconds
    });
  }
}
