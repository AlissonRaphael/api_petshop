import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { Validator } from "src/utils/validator";
import { CreditCard } from "../../models/creditcard.model";

@Injectable()
export class CreateCreditCardContract implements Contract {
  public errors: any[];

  validate(model: CreditCard): boolean {
    const validator = new Validator()

    validator.hasMinLen(model.holder, 3, 'Provedor inválido')
    validator.hasMinLen(model.number, 13, 'Número do cartão inválido')
    validator.hasMaxLen(model.number, 16, 'Número do cartão inválido')
    validator.isFixedLen(model.expiration, 5, 'Data de expiração inválida: MM/AA')

    this.errors = validator.errors

    return validator.isValid()
  }

}
