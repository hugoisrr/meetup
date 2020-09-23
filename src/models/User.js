import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    userRole: {
      type: String,
      enum: ['admin', 'general'],
      required: true,
    },
    notification: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
