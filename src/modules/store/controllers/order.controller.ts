import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';

import { ItemService } from '../services/item.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

import { Item } from '../entities/item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

import { Result } from 'src/modules/backoffice/models/result.model';
import { OrderItemDto } from '../dtos/orderItem/orderItem.dto';


@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService
  ){}

  @Get('id/:orderId')
  async getByNumber(@Param('orderId') orderId: number) {
    try {
      const orders = await this.orderService.getById(orderId)
      return new Result('Pedidos encontrados com sucesso.', true, orders, null)

    } catch (error) {
      throw new HttpException(
        new Result('Pedidos não encontrados, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }

  @Get('customer/:customer')
  async getOrdersByCustomer(@Param('customer') customer: string) {
    try {
      let sumary = []

      const orders = await this.orderService.getByCustomer(customer)

      for (let order of orders) {
        const orderItems = await this.itemService.getByOrderId(order.id)

        let total = 0
        orderItems.map(item => total += item.price * item.quantity)

        let sumaryOrder = {
          order_id: order.id,
          items: orderItems,
          total: total
        }

        sumary.push(sumaryOrder)
      }

      return new Result('Pedidos encontrados com sucesso.', true, sumary, null)

    } catch (error) {
      throw new HttpException(
        new Result('Pedidos não encontrados, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }

  @Post()
  async post(@Body() body: OrderItemDto[]) {

    try {
      let order = new Order()
      order.customer = '4837493847392' // JWT
      order = await this.orderService.create(order)

      for (let item of body) {
        let product = await this.productService.getById(item.product_id)

        const orderItem = new Item()
        Object.assign(orderItem, {
          order_id: order.id,
          product_id: product.id,
          price: product.price,
          quantity: (item.quantity >= product.quantity) ? product.quantity : item.quantity
        })
        await this.itemService.create(orderItem)

      }

      return new Result('Produto cadastrado com sucesso.', true, [], null)

    } catch (error) {
      throw new HttpException(
        new Result('Cadastro não realizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
