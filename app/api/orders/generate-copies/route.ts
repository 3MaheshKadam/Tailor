// app/api/orders/generate-copies/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import Tailor from "@/lib/models/Tailor";
import { requireRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    // admin only
    requireRole(req, ["admin"]);

    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

    const order = await Order.findById(orderId).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const customer = await Customer.findById(order.customerId).lean();
    const tailor = order.assignedTailor ? await Tailor.findById(order.assignedTailor).lean() : null;

    const adminCopy = {
      orderId: order._id,
      customer: customer || null,
      measurements: order.measurements,
      billing: order.billing,
      deadline: order.deadline,
      status: order.status,
      createdAt: order.createdAt,
    };

    const tailorCopy = {
      orderId: order._id,
      measurements: order.measurements,
      garmentType: order.garmentType,
      deadline: order.deadline,
      notes: "Tailor instructions (no billing/contact)",
    };

    const customerCopy = {
      orderId: order._id,
      garmentType: order.garmentType,
      measurements: order.measurements,
      billing: order.billing,
      deadline: order.deadline,
      status: order.status,
      shopContact: customer ? null : null,
    };

    // Save copies back to order
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        copies: { admin: adminCopy, tailor: tailorCopy, customer: customerCopy },
      },
    });

    return NextResponse.json({ copies: { admin: adminCopy, tailor: tailorCopy, customer: customerCopy } }, { status: 200 });
  } catch (err) {
    console.error("POST /api/orders/generate-copies error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
