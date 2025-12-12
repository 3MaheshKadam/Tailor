import { Schema, model, models } from "mongoose";

const MeasurementSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    garmentType: { type: String, required: true }, // shirt, pant, blouse, kurta, uniform

    values: {
      type: Object,
      required: true,
      // flexible to store different garment measurement structures
    },
  },
  { timestamps: true }
);

export default models.Measurement || model("Measurement", MeasurementSchema);
