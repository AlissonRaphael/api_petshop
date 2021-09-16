import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm'

import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { StoreModule } from './modules/store/store.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port:5432,
      username: 'docker',
      password: '12345',
      database: 'petshop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
    ScheduleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
