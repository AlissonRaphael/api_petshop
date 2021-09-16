import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { firstValueFrom, Observable } from "rxjs";
import { AddressType } from "../enums/addressType.enum";

import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>,
    private readonly httpService: HttpService
  ){}

  async addAddress(
    document: string,
    data: Address,
    type: AddressType
  ): Promise<Customer> {

    if(type === AddressType.Billing) {
      return await this.model.findOneAndUpdate(
        { document },
        { $push: { billingAddress: data, } },
        { upsert: true }
      )
    }

    if(type === AddressType.Shipping) {
      return await this.model.findOneAndUpdate(
        { document },
        { $push: { shippingAddress: data, } },
        { upsert: true }
      )
    }
  }

  async getAddressByZipCode(zipcode: string) {
    const response = await firstValueFrom(this.httpService.get(
      `https://viacep.com.br/ws/${zipcode}/json/`
    ))

    return await response.data
  }
}
