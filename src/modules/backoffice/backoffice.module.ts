import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CreditCardController } from './controllers/creditcard.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';

import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { AuthService } from 'src/shared/services/auth.services';
import { CreditCardService } from './services/creditcard.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';
import { JwtStrategy } from 'src/shared/config/jwt.config';


@Module({
  imports: [
    HttpModule,
    PassportModule.register(
      { defaultStrategy: 'jwt' }
    ),
    JwtModule.register(
      { signOptions: { expiresIn: 3600 }, secretOrPrivateKey: '49950928348723' }
    ),
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'User', schema: UserSchema },
    ]),
    CacheModule.register()
  ],
  controllers: [
    AccountController,
    AddressController,
    CreditCardController,
    CustomerController,
    PetController,
  ],
  providers: [
    AccountService,
    AddressService,
    AuthService,
    CreditCardService,
    CustomerService,
    PetService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
