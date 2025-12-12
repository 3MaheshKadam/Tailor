// app/api/customers/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Customer from "@/lib/models/Customer";

export async function GET() {
  try {
    await connectDB();
    const customers = await Customer.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ customers }, { status: 200 });
  } catch (err) {
    console.error("GET /api/customers error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, phone, gender, address } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
    }

    // allow multiple customers with same phone? if you want uniqueness, check here
    const existing = await Customer.findOne({ phone });
    if (existing) {
      // you may still allow duplicates; change behavior as needed
      return NextResponse.json({ error: "Phone already exists" }, { status: 409 });
    }

    const customer = await Customer.create({ name, phone, gender, address });
    return NextResponse.json({ customer }, { status: 201 });
  } catch (err) {
    console.error("POST /api/customers error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
