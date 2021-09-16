import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';

import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { Result } from 'src/modules/backoffice/models/result.model';

@Controller('v1/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ){}

  @Get()
  async get() {
    let products: Product[];

    try {
      products = await this.productService.get()
      return new Result('Produtos encontrados com sucesso.', true, products, null)

    } catch (error) {
      throw new HttpException(
        new Result('Produtos não encontrados, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )

    }
  }

  @Post()
  async post(@Body() body: Product) {
    let product: Product;

    try {
      await this.productService.create(body)
      return new Result('Produto cadastrado com sucesso.', true, product, null)

    } catch (error) {
      throw new HttpException(
        new Result('Cadastro não realizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Put(':id')
  async put(@Param('id') id, @Body() body){
    let product: Product;

    try {
      await this.productService.update(id, body)
      return new Result('Produto atualizado com sucesso.', true, null, null)

    } catch (error) {
      throw new HttpException(
        new Result('Atualização não realizado, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Delete(':id')
  async delete(@Param('id') id){
    let product: Product;

    try {
      await this.productService.remove(id)
      return new Result('Produto removido com sucesso.', true, null, null)

    } catch (error) {
      throw new HttpException(
        new Result('Remoção não realizada, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
} 
