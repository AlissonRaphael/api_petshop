import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';

import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { CreateAddressContract } from '../contracts/address/createAddress.contract';
import { AddressService } from '../services/address.service';
import { firstValueFrom } from 'rxjs';

@Controller('v1/customers')
export class AddressController {
  constructor(
    private readonly addressService: AddressService
  ){}

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addAddressBilling(
    @Param('document') document: string,
    @Body() body: Address
  ) {
    let customer: Customer;

    try {
      customer = await this.addressService.addAddress(document, body, 1)
      return new Result(
        'Endereço cadastrado com sucesso.',
        true,
        { billingAddress: customer.billingAddress },
        null
      )

    } catch (error) {
      throw new HttpException(
        new Result('Endereço não cadastrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addAddressShipping(
    @Param('document') document: string,
    @Body() body: Address
  ) {
    let customer: Customer;

    try {
      customer = await this.addressService.addAddress(document, body, 2)
      return new Result(
        'Endereço cadastrado com sucesso.',
        true,
        { shippingAddress: customer.shippingAddress },
        null
      )

    } catch (error) {
      throw new HttpException(
        new Result('Endereço não cadastrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Get('search/:zipcode')
  async searchZipCode(@Param('zipcode') zipcode: string){
    try {
      const data = await this.addressService.getAddressByZipCode(zipcode)

      return new Result(
        'Endereço encontrado com sucesso.',
        true,
        data,
        null
      )

    } catch (error) {
      throw new HttpException(
        new Result('Endereço não encontrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
