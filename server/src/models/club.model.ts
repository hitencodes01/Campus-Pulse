import mongoose, { Document, Schema } from "mongoose";

export interface IClub extends Document {
  name: string;
  description: string;
  category: string;
  clubHeads: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const clubSchema = new Schema<IClub>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    clubHeads: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Management"],
      required: true,
    },
  },
  { timestamps: true },
);

export const Club = mongoose.model<IClub>("Club", clubSchema);
