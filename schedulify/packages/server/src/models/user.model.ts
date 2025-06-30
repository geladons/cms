
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
}, {
  timestamps: true,
});

userSchema.index({ location: '2dsphere' }); // Index for geospatial queries

const User = model('User', userSchema);

export default User;
