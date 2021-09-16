import { Body, CacheInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Md5 } from 'md5-typescript';

import { CreateCustomerContract } from '../contracts/customer/createCustomer.contract';
import { CreateCustomerDto } from '../dtos/customer/createCustomer.dto';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { UpdateCustomerContract } from '../contracts/customer/updateCustomer.contract';
import { QueryContract } from '../contracts/query/createQuery.contract';
import { QueryInterceptor } from 'src/interceptors/query.interceptor';


@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService
  ){}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    let customers: Customer[]

    try {
      customers = await this.customerService.findAll()
      return new Result('Clientes encontrados com sucesso.', true, customers, null)

    } catch (error) {
      throw new HttpException(
        new Result('Clientes não encontrados, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }

  @Get('/search')
  @UseInterceptors(new QueryInterceptor(new QueryContract()))
  async query(@Query() query) {
    let customers: Customer[]

    try {
      customers = await this.customerService.query(query)
      return new Result('Clientes encontrados com sucesso.', true, customers, null)

    } catch (error) {
      throw new HttpException(
        new Result('Clientes não encontrados, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Get(':document')
  async getByDocument(@Param('document') document: string) {
    let customer: Customer

    try {
      customer = await this.customerService.find(document)
      return new Result('Cliente encontrado com sucesso.', true, customer, null)

    } catch (error) {
      throw new HttpException(
        new Result('Cliente não encontrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async create(@Body() body: CreateCustomerDto) {
    let user;
    let customer;

    try {
      const password = await Md5.init(`${body.password}${process.env.SALT_KEY}`)

      user = await this.accountService.create(
        new User(body.username, body.email, password, false, ['user'])
      )

      customer = await this.customerService.create(
        new Customer(body.document, body.username, user, [], [], [], [])
      )

      return new Result('Cliente cadastrado com sucesso.', true, customer, null)
    } catch (error) {
      throw new HttpException(
        new Result('Cadastro não realizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() body){
    let customer: Customer;

    try {
      customer = await this.customerService.update(document, body)
      return new Result('Cliente cadastrado com sucesso.', true, customer, null)

    } catch (error) {
      throw new HttpException(
        new Result('Cadastro não realizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
