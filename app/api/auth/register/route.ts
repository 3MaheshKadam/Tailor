// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // expected fields from your UI (you can adjust)
    const {
      name,
      email,
      phone,
      role, // 'admin' | 'tailor' | 'customer'
      shopName,
      address,
      city,
      state,
      password,
    } = body;

    // Basic validation
    if (!name || !role || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, role or password" },
        { status: 400 }
      );
    }

    if (role === "admin") {
      // ensure only one admin exists
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return NextResponse.json(
          { error: "An admin account already exists. Only one admin allowed." },
          { status: 409 }
        );
      }
    }

    // optionally check phone/email uniqueness for tailor/customer
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return NextResponse.json({ error: "Phone already registered" }, { status: 409 });
      }
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      role,
      shopName,
      address,
      city,
      state,
      password: hashed,
    });

    // remove password before sending back
    const userObj = user.toObject();
    delete (userObj as any).password;

    return NextResponse.json({ user: userObj }, { status: 201 });
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
