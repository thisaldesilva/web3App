import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create.order.dto';
import { AcceptOrderDto } from './dto/accept.order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('baker')
    @Post()
    async create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
        //console.log("req -> ", req)
        //console.log("body -> ", createOrderDto)
        //console.log("Req.user.iserID -> ", req.user.userId)

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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('baker')
    async findForBaker(@Param('bakerId') bakerId: string) {
        return await this.ordersService.findOrdersByBaker(bakerId);
    }

    @Patch(':orderId/accept')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('farmer')
    async markAsAccepted(@Param('orderId') orderId: string, @Body() acceptOrderDto: AcceptOrderDto) {
        return this.ordersService.markOrderAsAccepted(orderId, acceptOrderDto.price);
    }

    @Patch(':orderId/ship')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('farmer')
    async markAsShipped(@Param('orderId') orderId: string) {
        return this.ordersService.markOrderAsShipped(orderId);
    }
}