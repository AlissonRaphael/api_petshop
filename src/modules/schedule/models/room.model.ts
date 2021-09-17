import { AggregateRoot } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { RoomBookedEvent } from '../events/roomBooked.event'

export class Room extends AggregateRoot {
  constructor(
    private readonly id: string
  ){
    super()
  }

  book(customerId: string, date: Date){
    this.apply(new RoomBookedEvent(customerId, this.id, date))
  }
}