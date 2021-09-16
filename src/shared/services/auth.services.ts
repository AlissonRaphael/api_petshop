import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { AccountService } from 'src/modules/backoffice/services/account.service'
import { JwtPayload } from '../interfaces/jwtPayload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ){}

  async createToken({ document, email, roles }: JwtPayload) {
    const user = { document, email, roles }

    const accessToken = this.jwtService.sign(user)

    return {
      expireIn: 3600,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload
    // return await this.accountService.findByUsername(payload.document)
  }
}