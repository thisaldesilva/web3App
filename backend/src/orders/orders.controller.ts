import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create.order.dto';
import { response } from 'express';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('baker')
    @Post()
    async create(@Req() req, @Body() createOrderDto: CreateOrderDto ) {
        // use the userId from JWT | Do not depend on the body
        createOrderDto.requested_backer_id = req.user.userId
        
        const response = await this.ordersService.createOrder(createOrderDto);
        return response 
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('farmer')
    async findAll() {
        return this.ordersService.findAllOrders();
    }

    @Get(':bakerId')
    async findForBaker(@Param('bakerId') bakerId: string) {
        return await this.ordersService.findOrdersByBaker(bakerId);
    }

    // @Delete(':orderId')
    // async delete(@Param('orderId') orderId: string) {
    //     return this.ordersService.deleteOrder(orderId);
    // }

    @Patch(':orderId/ship')
    async markAsShipped(@Param('orderId') orderId: string) {
        console.log("order id -> ", orderId)
        return this.ordersService.markOrderAsShipped(orderId);
    }
}