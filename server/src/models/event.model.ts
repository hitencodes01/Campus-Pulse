import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  fest: mongoose.Types.ObjectId;
  organizingClubs: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    fest: {
      type: Schema.Types.ObjectId,
      ref: "Fest",
      required: true,
    },

    organizingClubs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

eventSchema.index({ fest: 1 });
eventSchema.index({ organizingClubs: 1 });

export const Event = mongoose.model<IEvent>("Event", eventSchema);