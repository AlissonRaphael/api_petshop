import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { Validator } from "src/utils/validator";
import { UpdateCustomerDto } from "../../dtos/customer/updateCustomer.dto";

@Injectable()
export class UpdateCustomerContract implements Contract {
  public errors: any[];

  validate(model: UpdateCustomerDto): boolean {
    const validator = new Validator()

    validator.hasMinLen(model.username, 5, 'Nome inválido')

    this.errors = validator.errors

    return validator.isValid()
  }

}
