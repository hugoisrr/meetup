/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const meetUpSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    description: {
      type: String,
      trim: true,
      min: 2,
    },
    status: {
      type: String,
      enum: ['draft', 'release', 'done'],
      required: true,
    },
    startTime: Date,
    stopTime: Date,
    votingPositive: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    votingNegative: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

meetUpSchema.virtual('durationMin').get(function () {
  const diff = Math.abs(this.stopTime - this.startTime);
  return Math.floor(diff / 1000 / 60);
});

export default model('MeetUp', meetUpSchema);
