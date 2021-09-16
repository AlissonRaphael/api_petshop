import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';

import { ItemService } from './services/item.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

import { Item } from './entities/item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Order, Product])
  ],
  controllers: [
    OrderController,
    ProductController
  ],
  providers: [
    ItemService,
    OrderService,
    ProductService
  ]
})
export class StoreModule {}
