import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  employee?: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  fee: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paid: boolean;
}

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paid: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;