import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RoomModel } from '../models/roomRepository.model';


@Injectable()
export class RoomRepository {

  constructor(
    @InjectModel('Room')
    private readonly roomModel: Model<RoomModel>,
  ){}

  async findRoomByIdAndAvailable(room_id: string, date: Date): Promise<RoomModel> {
    const room = await this.roomModel
      .findOne({ '_id': room_id, date })
      .exec();

    return room
  }

  async save(data: RoomModel){
    const room = new this.roomModel(data)

    await room.save()
  }

}