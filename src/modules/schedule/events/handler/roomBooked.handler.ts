import { IEventHandler, EventsHandler } from '@nestjs/cqrs'

import { RoomBookedEvent } from '../roomBooked.event'


@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {

  handle(event: RoomBookedEvent) {
    console.log('RoomBookedEvent')
  }

}