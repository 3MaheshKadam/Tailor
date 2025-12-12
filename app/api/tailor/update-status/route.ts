// app/api/tailor/update-status/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import { parseTokenFromRequest } from "@/lib/auth";

const ALLOWED_TAILOR_TRANSITIONS = ["tailoring", "ready", "delivered"];

export async function POST(req: Request) {
  try {
    await connectDB();

    const payload = parseTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { orderId, status } = await req.json();
    if (!orderId || !status) return NextResponse.json({ error: "orderId and status required" }, { status: 400 });

    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // If the caller is tailor, restrict allowed statuses and ensure assignment
    if (payload.role === "tailor") {
      if (!ALLOWED_TAILOR_TRANSITIONS.includes(status)) {
        return NextResponse.json({ error: "Tailor cannot set this status" }, { status: 403 });
      }
      if (!order.assignedTailor || order.assignedTailor.toString() !== payload.sub) {
        return NextResponse.json({ error: "Not assigned to this order" }, { status: 403 });
      }
    } else if (payload.role === "customer") {
      return NextResponse.json({ error: "Customers cannot change status" }, { status: 403 });
    }
    // Admin can set any allowed status value
    order.status = status;
    await order.save();

    // Optionally: send notifications to customer/admin based on status change

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error("POST /api/tailor/update-status error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
