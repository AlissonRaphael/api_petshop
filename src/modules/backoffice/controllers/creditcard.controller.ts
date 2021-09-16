import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';

import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Customer } from '../models/customer.model';
import { CreateCreditCardContract } from '../contracts/creditcard/createdCreditCard.contract';
import { CreditCard } from '../models/creditcard.model';
import { CreditCardService } from '../services/creditcard.service';

@Controller('v1/customers')
export class CreditCardController {
  constructor(
    private readonly creditCardService: CreditCardService
  ){}

  @Post(':document/creditcard')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async create(
    @Param('document') document: string,
    @Body() body: CreditCard
  ) {
    let customer: Customer;

    try {
      customer = await this.creditCardService.create(document, body)
      return new Result(
        'Cartão cadastrado com sucesso.',
        true,
        { creditCard: customer.creditCard },
        null
      )

    } catch (error) {
      throw new HttpException(
        new Result('Cartão não cadastrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Put(':document/creditcard/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async update(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() body: CreditCard
  ) {
    let customer: Customer;

    try {
      customer = await this.creditCardService.update(document, id, body)
      return new Result(
        'Cartão atualizado com sucesso.',
        true,
        { creditCard: customer.creditCard },
        null
      )

    } catch (error) {
      throw new HttpException(
        new Result('Cartão não atualizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
