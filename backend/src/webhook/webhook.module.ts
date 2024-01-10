import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { OrdersModule } from 'src/orders/orders.module';


@Module({
  imports: [OrdersModule],
  controllers: [WebhookController],
  providers: [],
})
export class WebhookModule {}
