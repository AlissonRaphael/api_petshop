import { Injectable } from "@nestjs/common";

import { Contract } from "../contract";
import { Validator } from "src/utils/validator";
import { Pet } from "../../models/pet.model";

@Injectable()
export class CreatePetContract implements Contract {
  public errors: any[];

  validate(model: Pet): boolean {
    const validator = new Validator()

    validator.hasMinLen(model.name, 1, 'Nome inválido')
    validator.hasMinLen(model.gender, 4, 'Sexo inválido')
    validator.hasMinLen(model.kind, 2, 'Espécie inválida')
    validator.hasMinLen(model.brand, 2, 'Raça inválida')

    this.errors = validator.errors

    return validator.isValid()
  }

}
