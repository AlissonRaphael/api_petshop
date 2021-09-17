import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { ScheduleController } from './controllers/schedule.controller';

import { RoomBookService } from './services/roomBook.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { EventsHandlers } from './events/handler';
import { RoomSchema } from './schemas/room.schema';


@Module({
  imports: [
    CqrsModule,
    PassportModule.register(
      { defaultStrategy: 'jwt' }
    ),
    JwtModule.register(
      { signOptions: { expiresIn: 3600 }, secretOrPrivateKey: '49950928348723' }
    ),
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema }
    ]),
  ],
  controllers: [ScheduleController],
  providers: [
    RoomBookService,
    RoomRepository,
    ...CommandHandlers,
    ...EventsHandlers
  ]
})
export class ScheduleModule {}
