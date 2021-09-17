import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { BookRoomCommand } from '../bookRoom.command'
import { RoomRepository } from '../../repositories/room.repository'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Result } from 'src/modules/backoffice/models/result.model'

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(
    private readonly repository: RoomRepository
  ){}

  async execute(command: BookRoomCommand): Promise<void> {
    const room = await this.repository.findRoomByIdAndAvailable(command.roomId, command.date)

    if (!room) {
      throw new HttpException(
        new Result('Sala não encontrado ou indisponível.', false, null, null),
        HttpStatus.NOT_FOUND
      )
    }

    room.book(command.customerId, command.date)
    await this.repository.save(room)

    return
  }

}
