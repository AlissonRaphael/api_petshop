import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { Guid } from 'guid-typescript'

import { AuthenticateDto } from '../dtos/account/authenticate.dto'
import { ForgotPasswordDto } from '../dtos/account/forgotPassword.dto';
import { ResetPasswordDto } from '../dtos/account/resetPassword.dto';

import { AuthService } from 'src/shared/services/auth.services'
import { AccountService } from '../services/account.service'

import { Result } from '../models/result.model';
import { Customer } from '../models/customer.model';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { request } from 'http';


@Controller('v1/accounts')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService
  ){}

  @Post('login')
  async authenticate(@Body() body: AuthenticateDto): Promise<any> {
    try {
      if (body.password !== body.passwordRepeated) {
        throw new HttpException(
          new Result('Senha incorreta', false, null, null),
          HttpStatus.BAD_REQUEST
        )
      }

      const customer: Customer = await this.accountService.findUser(
        body.email,
        body.password
      )

      if (!customer) {
        throw new HttpException(
          new Result('Usuário não encontrado.', false, null, null),
          HttpStatus.NOT_FOUND
        )
      }

      if (!customer.user.active) {
        throw new HttpException(
          new Result('Usuário inativo.', false, null, null),
          HttpStatus.UNAUTHORIZED
        )
      }

      const token = await this.authService.createToken({
        document: customer.document,
        email: customer.user.email,
        roles: customer.user.roles
      })

      return new Result('Autenticação realizada com sucesso.', true, token, null )

    } catch (error) {
      throw new HttpException(
        new Result('Falha de autenticação, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Post('forgot')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<any> {
    try {
      
      const password = Guid.create().toString().substring(0,8).replace('-', '')
      await this.accountService.updateUser(body.email, { password: password })

      return new Result('Senha enviada para email.', true, null, null )

    } catch (error) {
      throw new HttpException(
        new Result('Falha na recuperação, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Req() request, @Body() body: ResetPasswordDto): Promise<any> {
    try {
      if (body.password !== body.passwordRepeated) {
        throw new HttpException(
          new Result('Senha incorreta', false, null, null),
          HttpStatus.BAD_REQUEST
        )
      }

      await this.accountService.updateUser(request.user.email, { password: body.password })

      return new Result('Senha alterada com sucesso.', true, null, null )

    } catch (error) {
      throw new HttpException(
        new Result('Falha na alteração de senha, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
