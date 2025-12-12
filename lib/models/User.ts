// lib/models/User.ts
import { Schema, model, models } from "mongoose";

export type IUser = {
  name: string;
  email?: string;
  phone?: string;
  role: "admin" | "tailor" | "customer";
  shopName?: string; // for admin
  address?: string;
  city?: string;
  state?: string;
  password: string;
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, index: true, unique: false },
    phone: { type: String, required: false, index: true },
    role: { type: String, enum: ["admin", "tailor", "customer"], required: true },
    shopName: { type: String }, // useful for admin
    address: { type: String },
    city: { type: String },
    state: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid registering model multiple times in dev
const User = models.User || model("User", UserSchema);
export default User;
