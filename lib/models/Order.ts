
import { Schema, model, models } from "mongoose";

const BillingSchema = new Schema({
  amount: { type: Number, required: true },
  advance: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
});

const TimelineItem = new Schema({
  status: { type: String, required: true },
  by: { type: String }, // adminId or tailorId
  at: { type: Date, default: Date.now }
});

const NotificationsSchema = new Schema({
  created: { type: Boolean, default: false },
  ready: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
});

const OrderSchema = new Schema(
  {
    // ******** CUSTOMER STORED INSIDE ORDER ********
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String },

    // ******** ORDER DETAILS ********
    garmentType: { type: String, required: true },
    measurements: { type: Schema.Types.Mixed, default: {} },
    billing: { type: BillingSchema, required: true },
    deadline: { type: Date },

    // ******** WORKFLOW ********
    status: { type: String, default: "measuring" },
    assignedTailor: { type: Schema.Types.ObjectId, ref: "Tailor", default: null },

    // ******** TRACKING ********
    timeline: { type: [TimelineItem], default: [] },

    // ******** NOTIFICATIONS ********
    notifications: { type: NotificationsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
