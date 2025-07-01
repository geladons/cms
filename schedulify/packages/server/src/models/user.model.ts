
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  // ... (existing fields)
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
    address: String,
  },
  availability: [{
    day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    slots: [{
      startTime: String,
      endTime: String,
    }],
  }],
  notes: [{
    content: String,
    createdAt: { type: Date, default: Date.now },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
  loyaltyPoints: { type: Number, default: 0 },
  bio: { type: String, trim: true },
  title: { type: String, trim: true },
  profileImage: { type: String },
}, {
  timestamps: true,
});

userSchema.index({ location: '2dsphere' }); // Index for geospatial queries

const User = model('User', userSchema);

export default User;
