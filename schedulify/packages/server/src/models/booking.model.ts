
import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  employee?: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  fee: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paid: boolean;
}

// ...

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
