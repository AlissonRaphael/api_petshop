import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm";

import { Product } from '../entities/product.entity'


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  async get(): Promise<Product[]> {
    return await this.repository.find();
  }

  async getById(id:number): Promise<Product> {
    return await this.repository.findOne(id)
  }

  async create(product: Product): Promise<void> {
    await this.repository.save(product)
  }

  async update(id: number, product: Product) {
    return await this.repository.update(id, product)
  }

  async remove(id: number) {
    await this.repository.delete(id)
  }

}
