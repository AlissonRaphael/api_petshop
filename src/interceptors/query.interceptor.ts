import { ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "../modules/backoffice/contracts/contract";
import { Result } from "../modules/backoffice/models/result.model";

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  constructor(
    public contract: Contract
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    const query = context.switchToHttp().getRequest().query
    const valid = this.contract.validate(query)

    if(!valid){
      throw new HttpException(
        new Result('Algo errado aconteceu.', false, null, this.contract.errors),
        HttpStatus.BAD_REQUEST
      )
    }

    return next.handle()
  }

}
