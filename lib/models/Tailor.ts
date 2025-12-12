import { Schema, model, models } from "mongoose";

const TailorSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: "tailor" }, // static roles
  },
  { timestamps: true }
);

export default models.Tailor || model("Tailor", TailorSchema);
