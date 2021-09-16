export class AuthenticateDto {

  constructor(
    public email: string,
    public password: string,
    public passwordRepeated: string,
  ){}

}