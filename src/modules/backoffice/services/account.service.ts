import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Md5 } from "md5-typescript";

import { Customer } from "../models/customer.model";
import { User } from "../models/user.model";


@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Customer')
    private readonly customerModel: Model<Customer>
  ){}

  async create(data: User): Promise<User> {
    const user = new this.userModel(data)

    return await user.save();
  }

  async findUser(email: string, password: string): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ 
        'user.email': email
      })
      .populate('user')
      .exec();

    const encryptedPassword = await Md5.init(`${password}${process.env.SALT_KEY}`)
    if (!(encryptedPassword.toString() === customer.user.password.toString())) {
      return null
    }

    return customer;
  }

  async updateUser(email: string, data: any): Promise<any> {
    return await this.userModel.findOneAndUpdate({ email }, data)
  }
}