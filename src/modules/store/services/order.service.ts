import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Order } from "../entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>
  ){}

  async getById(id: number): Promise<Order> {
    return await this.repository.findOne(id)
  }

  async getByCustomer(customer: string): Promise<Order[]> {
    return await this.repository.find({ customer: customer })
  }

  async create(data: Order): Promise<Order> {
    return await this.repository.save(data)
  }
}
