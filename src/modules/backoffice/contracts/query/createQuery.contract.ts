import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { Validator } from "src/utils/validator";
import { QueryDto } from "../../dtos/query/query.dto";

@Injectable()
export class QueryContract implements Contract {
  public errors: any[];

  validate(model: QueryDto): boolean {
    const validator = new Validator()

    if(Number(model.skip) < 1) validator.addError('Paginação inválida')
    if(Number(model.take) > 25) validator.addError('Quantidade de registros inválida')

    this.errors = validator.errors

    return validator.isValid()
  }

}
