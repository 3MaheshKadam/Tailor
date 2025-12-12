// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

// GET /api/orders  -> return all orders (latest first)
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/orders -> create new order (NO AUTH, NO WHATSAPP)
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerAddress,
      garmentType,
      measurements,
      billing,
      deadline,
    } = body || {};

    // Basic validation
    if (!customerName || !customerPhone || !garmentType) {
      return NextResponse.json(
        { error: "customerName, customerPhone, garmentType are required" },
        { status: 400 }
      );
    }

    if (!billing || billing.amount === undefined || billing.amount === null) {
      return NextResponse.json(
        { error: "billing.amount is required" },
        { status: 400 }
      );
    }

    // Build order data according to your schema
    const orderData: any = {
      customerName: String(customerName).trim(),
      customerPhone: String(customerPhone).trim(),
      customerAddress: customerAddress ? String(customerAddress).trim() : "",
      garmentType: String(garmentType).trim(),
      measurements: measurements || {},
      billing: {
        amount: Number(billing.amount),
        advance: Number(billing.advance || 0),
        balance:
          billing.balance !== undefined
            ? Number(billing.balance)
            : Number(billing.amount) - Number(billing.advance || 0),
      },
      deadline: deadline ? new Date(deadline) : undefined,
      status: "measuring",
      timeline: [{ status: "measuring", by: "admin", at: new Date() }],
      notifications: { created: false, ready: false, delivered: false },
    };

    const order = await Order.create(orderData);

    return NextResponse.json({ order }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/orders error:", err);

    // If it's a mongoose validation error, show details
    if (err?.name === "ValidationError") {
      const details: Record<string, string> = {};
      for (const key in err.errors) {
        details[key] = err.errors[key].message;
      }
      return NextResponse.json(
        { error: "Validation error", details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Server error",
        debug:
          process.env.NODE_ENV === "development"
            ? err?.stack || String(err)
            : undefined,
      },
      { status: 500 }
    );
  }
}
