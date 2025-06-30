
import { Schema, model, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  isActive: boolean;
}

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Service = model<IService>('Service', serviceSchema);

export default Service;
