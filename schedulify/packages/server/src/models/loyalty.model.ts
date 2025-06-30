
import { Schema, model, Document } from 'mongoose';

export interface ILoyaltyTransaction extends Document {
  user: Schema.Types.ObjectId;
  points: number;
  type: 'earned' | 'redeemed';
  description: string;
  createdAt: Date;
}

const loyaltyTransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['earned', 'redeemed'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const LoyaltyTransaction = model<ILoyaltyTransaction>('LoyaltyTransaction', loyaltyTransactionSchema);

export default LoyaltyTransaction;
