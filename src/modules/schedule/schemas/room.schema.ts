import * as mongoose from 'mongoose'

export const RoomSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    required: true,
    default: true,
  },
  
})
