import mongoose, { Schema, Document } from "mongoose";

export interface IFest extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const festSchema = new Schema<IFest>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Fest = mongoose.model<IFest>("Fest", festSchema);
