
import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  booking: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  employee: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  isApproved: boolean;
}

const reviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    unique: true, // A booking can only be reviewed once
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
