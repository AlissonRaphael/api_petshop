import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common'

import { RoomBookService } from '../services/roomBook.service'
import { BookRoomDto } from '../dtos/bookRoom.dto'
import { JwtAuthGuard } from 'src/shared/guards/auth.guard'
import { BookRoomCommand } from '../commands/bookRoom.command'
import { Result } from 'src/modules/backoffice/models/result.model'


@Controller('v1/rooms')
export class ScheduleController {
  constructor(
    private readonly service: RoomBookService
  ){}

  @Post()
  @UseGuards(JwtAuthGuard)
  async book(@Req() request, @Body() body: BookRoomDto) {
    try {
      let command = new BookRoomCommand(request.user.document, body.roomId, body.date)
      await this.service.Book(command)
  
    } catch (error) {
      throw new HttpException(
        new Result('Sala não reservada, algo inesperado ocorreu.', false, null, null),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
