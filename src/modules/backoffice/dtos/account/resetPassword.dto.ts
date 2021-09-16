export class ResetPasswordDto {

  constructor(
    public password: string,
    public passwordRepeated: string
  ){}

}