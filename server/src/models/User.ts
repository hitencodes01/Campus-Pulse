import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../types/roles.js";
import { compare, hash } from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Student,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
