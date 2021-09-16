import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';

import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { CreatePetContract } from '../contracts/pet/createPet.contract';
import { PetService } from '../services/pet.service';

@Controller('v1/customers')
export class PetController {
  constructor(
    private readonly petService: PetService
  ){}

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() body: Pet) {
    let customer: Customer;

    try {
      customer = await this.petService.create(document, body)
      return new Result('Pet cadastrado com sucesso.', true, { pets: customer.pets }, null)
  
    } catch (error) {

      throw new HttpException(
        new Result('Pet não cadastrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() body: Pet
  ) {

    let customer: Customer;

    try {
      customer = await this.petService.update(document, id, body)
      return new Result('Pet cadastrado com sucesso.', true, { pets: customer.pets }, null)

    } catch (error) {

      throw new HttpException(
        new Result('Pet não cadastrado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }
} 
