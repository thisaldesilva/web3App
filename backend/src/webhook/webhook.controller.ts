import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

@Controller('webhook')
export class WebhookController {
    constructor(private ordersService: OrdersService) {}

    @Post('events')
    async handleBlockchainEvent(@Body() eventData: any) {
        console.log("***************************    handleBlockchainEvent   *********************************")
        console.log(JSON.stringify(eventData));
        return 
        //return this.ordersService.processBlockchainEvent(eventData);
    }
}
