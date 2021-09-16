import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { Validator } from "src/utils/validator";
import { Address } from "../../models/address.model";

@Injectable()
export class CreateAddressContract implements Contract {
  public errors: any[];

  validate(model: Address): boolean {
    const validator = new Validator()

    validator.isFixedLen(model.zipCode, 8, 'CEP inválido')
    validator.hasMinLen(model.street, 3, 'Rua inválida')
    validator.hasMinLen(model.neighborhood, 3, 'Bairro inválido')
    validator.hasMinLen(model.city, 3, 'Cidade inválida')
    validator.isFixedLen(model.state, 2, 'Estado inválido')
    validator.isFixedLen(model.country, 3, 'País inválido')

    this.errors = validator.errors

    return validator.isValid()
  }

}
