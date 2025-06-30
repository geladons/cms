
import { Schema, model, Document } from 'mongoose';

export interface ITimeOff extends Document {
  employee: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
}

const timeOffSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const TimeOff = model<ITimeOff>('TimeOff', timeOffSchema);

export default TimeOff;
