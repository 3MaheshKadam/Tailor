// app/api/tailors/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tailor from "@/lib/models/Tailor";

/**
 * GET /api/tailors
 * - returns list of tailors
 * - optional query param `q` to search by name (partial, case-insensitive) or exact phone
 *
 * Example:
 *  GET /api/tailors
 *  GET /api/tailors?q=raju
 *  GET /api/tailors?q=8887776666
 */
export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim();

    const filter: any = {};
    if (q) {
      // search by name (partial, case-insensitive) OR exact phone match
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { phone: q },
      ];
    }

    const tailors = await Tailor.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ tailors }, { status: 200 });
  } catch (err) {
    console.error("GET /api/tailors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
