import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreditCard } from "../models/creditcard.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>
  ){}

  async create(document: string, data: CreditCard): Promise<Customer> {
    return await this.model.findOneAndUpdate(
      { document },
      { $push: { creditCard: data } },
      { upsert: true, new: true }
    )
  }

  async update(document: string, id: string, data: CreditCard): Promise<Customer> {
    return await this.model.findOneAndUpdate(
      { document, 'creditCard._id': id },
      { $set: { 'creditCard.$': data } }
    )
  }
}
