
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // Not required for OAuth or phone auth
  },
  role: {
    type: String,
    enum: ['client', 'employee', 'admin'],
    default: 'client',
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

const User = model('User', userSchema);

export default User;
