export class QueryDto {

  constructor(
    public document: string,
    public fields: string,
    public sort: string,
    public skip: number = 0,
    public take: number = 25,
  ){}
}
