// app/api/orders/[orderId]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

/**
 * GET /api/orders/[orderId]
 * Robust handler: validate id, attempt populate (only assignedTailor), fallback to raw document.
 */
export async function GET(req: Request, ctx: { params: any }) {
  try {
    // Resolve params (Next.js may pass a Promise)
    const rawParams = ctx?.params;
    const params = rawParams && typeof rawParams.then === "function" ? await rawParams : rawParams;

    console.log("[ORDERS.GET] resolved params:", params);

    const orderId = params?.orderId;
    if (!orderId) {
      console.warn("[ORDERS.GET] missing orderId");
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.warn("[ORDERS.GET] invalid ObjectId:", orderId);
      return NextResponse.json({ error: "Invalid orderId format" }, { status: 400 });
    }

    await connectDB();
    console.log("[ORDERS.GET] mongoose models:", mongoose.modelNames());

    // Try to fetch populated doc for assignedTailor only (customer stored inside order)
    try {
      const order = await Order.findById(orderId)
        .populate("assignedTailor", "name phone") // populate tailor if present
        .lean();

      if (!order) {
        console.warn(`[ORDERS.GET] Order not found: ${orderId}`);
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({ order }, { status: 200 });
    } catch (populateErr) {
      console.error("[ORDERS.GET] populate error:", populateErr && (populateErr.stack || populateErr));
      // fall through to fallback raw fetch
    }

    // Fallback: return raw order (no populate)
    const orderRaw = await Order.findById(orderId).lean();
    if (!orderRaw) {
      console.warn(`[ORDERS.GET] Order not found (raw): ${orderId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const resp: any = { order: orderRaw, note: "returned raw order because populate failed" };

    if (process.env.NODE_ENV !== "production") {
      resp.debug = {
        models: mongoose.modelNames(),
      };
    }

    return NextResponse.json(resp, { status: 200 });
  } catch (err: any) {
    console.error("[ORDERS.GET] Unexpected error:", err && (err.stack || err));

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ error: "Server error", stack: err?.stack || String(err) }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
