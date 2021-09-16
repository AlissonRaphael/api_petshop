import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Customer } from "../models/customer.model";
import { QueryDto } from "../dtos/query/query.dto";
import { UpdateCustomerDto } from "../dtos/customer/updateCustomer.dto";


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>
  ){}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data)

    return await customer.save()
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'username email document')
      .sort('username')
      .exec()
  }

  async find(document: string): Promise<Customer> {
    return await this.model
      .findOne({ document }, '-creditCard')
      .populate('user', '-password')
      .exec()
  }

  async query(model: QueryDto): Promise<Customer[]> {
    const query = model.document ? { document: model.document } : {}

    return await this.model
      .find(
        query,
        model.fields,
        { skip: model.skip, limit: model.take }
      )
      .sort(model.sort)
      .exec()
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data)
  }
}
