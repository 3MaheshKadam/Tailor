// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { parseTokenFromRequest } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // parse token first (no DB needed if token absent)
    const payload = parseTokenFromRequest(req);
    if (!payload) {
      // not logged in — return user: null (frontend can handle)
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // token exists — fetch user from DB
    await connectDB();

    const user = await User.findById(payload.sub).select("-password").lean();
    if (!user) {
      // user not found (maybe deleted) — clear cookie by returning user:null
      // optionally you can also clear cookie here
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Return user object (same shape as login response)
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
