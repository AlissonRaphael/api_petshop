import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Item } from "../entities/item.entity";

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>
  ){}

  async getByOrderId(orderId: number): Promise<Item[]> {
    return await this.repository.find({ order_id: orderId })
  }

  async create(data: Item){
    await this.repository.save(data)
  }
}
