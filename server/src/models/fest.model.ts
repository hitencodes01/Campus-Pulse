import mongoose, { Schema, Document } from "mongoose";

export interface IFest extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
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
    status: {
      type: String,
      enum : ["upcoming" , "ongoing" , "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export const Fest = mongoose.model<IFest>("Fest", festSchema);
