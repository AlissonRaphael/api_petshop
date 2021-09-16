import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../services/auth.services'
import { JwtPayload } from '../interfaces/jwtPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '49950928348723',
    })
  }

  async validate(payload: JwtPayload){
    const user = await this.authService.validateUser(payload)

    if(!user){
      throw new UnauthorizedException()
    }

    return user
  }

}
