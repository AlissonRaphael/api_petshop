import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { CreateCustomerDto } from "../../dtos/customer/createCustomer.dto";
import { Validator } from "src/utils/validator";

@Injectable()
export class CreateCustomerContract implements Contract {
  public errors: any[];

  validate(model: CreateCustomerDto): boolean {
    const validator = new Validator()

    validator.hasMinLen(model.username, 5, 'Nome inválido')
    validator.isEmail(model.email, 'Email inválido')
    validator.hasMinLen(model.password, 6, 'Senha inválida')
    validator.isFixedLen(model.document, 11, 'CPF inválido')

    this.errors = validator.errors

    return validator.isValid()
  }

}
