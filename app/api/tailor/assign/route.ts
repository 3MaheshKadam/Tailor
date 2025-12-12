// app/api/tailor/assign/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Tailor from "@/lib/models/Tailor";
import User from "@/lib/models/User";
import { requireRole } from "@/lib/auth";
import mongoose from "mongoose";

/** Safe notify helper: dynamic import notifications so missing provider won't crash route */
async function safeNotifyCustomer(phone: string, message: string) {
  try {
    const mod = await import("@/lib/notifications").catch(() => null);
    if (!mod || typeof mod.sendWhatsAppMessage !== "function") {
      console.log("[notifications] sendWhatsAppMessage not available — skipping (fallback). Message preview:", { phone, message });
      return { ok: true, fallback: true };
    }
    return await mod.sendWhatsAppMessage(phone, message);
  } catch (err) {
    console.error("[notifications] error in safeNotifyCustomer:", err);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // require admin role
    const payload = requireRole(req, ["admin"]); // throws Response if unauthorized

    const body = await req.json();
    const { orderId, tailorId } = body || {};

    if (!orderId || !tailorId) {
      return NextResponse.json({ error: "orderId and tailorId required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json({ error: "Invalid orderId format" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(tailorId)) {
      return NextResponse.json({ error: "Invalid tailorId format" }, { status: 400 });
    }

    // Find the tailor
    let tailor = await Tailor.findById(tailorId).lean();

    // If not in Tailor collection, try User collection
    if (!tailor) {
      const user = await User.findById(tailorId).lean();
      if (!user || user.role !== "tailor") {
        return NextResponse.json({ error: "Tailor not found" }, { status: 404 });
      }

      // create Tailor doc reusing same _id so populate() works later
      try {
        const created = await Tailor.create({
          _id: user._id,
          name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          phone: user.phone || null,
          role: "tailor",
        });
        tailor = created.toObject();
      } catch (createErr) {
        // If create failed because Tailor model already exists in models map, just fall back to using user info
        console.warn("Failed to create Tailor from User (continuing with user info):", createErr);
        tailor = {
          _id: user._id,
          name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          phone: user.phone || null,
          role: "tailor",
        };
      }
    }

    // Update order: set assignedTailor, status, timeline, assignedBy
    const update = {
      assignedTailor: tailor._id,
      status: "tailoring",
      $push: { timeline: { status: "tailoring", by: payload.sub || "admin", at: new Date() } as any },
      assignedBy: payload.sub || undefined,
    } as any;

    // Remove undefined props
    if (!update.assignedBy) delete update.assignedBy;

    const order = await Order.findByIdAndUpdate(orderId, update, { new: true })
      .populate("assignedTailor", "name phone")
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Notify customer (non-blocking but awaited here to give feedback)
    (async () => {
      try {
        const shortId = String(order._id).slice(0, 8);
        const shopName = process.env.SHOP_NAME || "Your Tailor";
        const tailorName = (tailor && (tailor as any).name) || "your tailor";
        const msg = `Hi ${order.customerName || "Customer"}, your order ${shortId} has been assigned to ${tailorName}. Status: tailoring. - ${shopName}`;
        const res = await safeNotifyCustomer(order.customerPhone, msg);
        if (res && res.ok) {
          // update notifications.created or other flags if desired; here we only set ready/delivered on status change
          // If you want a flag for 'assign notified', add that to schema and update here.
          console.log("Customer notified (assign):", res);
        } else {
          console.warn("Customer notify failed (assign):", res);
        }
      } catch (notifyErr) {
        console.error("Async customer notify error (assign):", notifyErr);
      }
    })();

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error("POST /api/tailor/assign error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
