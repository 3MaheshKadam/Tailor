// app/api/customers/[customerId]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Customer from "@/lib/models/Customer";

export async function GET(req: Request, { params }: { params: { customerId: string } }) {
  try {
    await connectDB();
    const { customerId } = params;
    const customer = await Customer.findById(customerId).lean();
    if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ customer }, { status: 200 });
  } catch (err) {
    console.error("GET /api/customers/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { customerId: string } }) {
  try {
    await connectDB();
    const { customerId } = params;
    const body = await req.json();
    const customer = await Customer.findByIdAndUpdate(customerId, body, { new: true }).lean();
    if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ customer }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/customers/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { customerId: string } }) {
  try {
    await connectDB();
    const { customerId } = params;
    const deleted = await Customer.findByIdAndDelete(customerId).lean();
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/customers/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
