export class CreateCustomerDto {

  constructor(
    public document: string,
    public username: string,
    public email: string,
    public password: string,
  ){}

}