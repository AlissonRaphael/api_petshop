import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

import { JwtPayload } from '../interfaces/jwtPayload.interface'
import { Result } from 'src/modules/backoffice/models/result.model'

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(
    public roles: string[]
  ){}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {

    const payload: JwtPayload = context.switchToHttp().getRequest().user
    console.log(payload)

    const hasRole = payload.roles.some(payloadRole => this.roles.includes(payloadRole))
    console.log(hasRole)

    if (!hasRole) {
      throw new HttpException(
        new Result('Acesso não autorizado', false, null, null),
        HttpStatus.FORBIDDEN
      )
    }

    return next.handle()
  }

}