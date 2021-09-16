import { Pet } from './pet.model'
import { Address } from './address.model'
import { CreditCard } from './creditcard.model'
import { User } from './user.model'

export class Customer {

  constructor(
    public document: string,
    public username: string,
    public user: User,
    public pets: Pet[],
    public billingAddress: Address[],
    public shippingAddress: Address[],
    public creditCard: CreditCard[]
  ){}
}
