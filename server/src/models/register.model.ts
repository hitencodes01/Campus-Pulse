import mongoose, { Schema } from "mongoose";

export interface IRegistration extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  createdAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent Duplicate registrationSchema
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export const Registration = mongoose.model<IRegistration>(
  "Registration",
  registrationSchema,
);
