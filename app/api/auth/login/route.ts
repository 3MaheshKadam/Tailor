// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;
// const JWT_EXPIRES_IN = "1d";

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const { identifier, password, role } = await req.json();

//     if (!identifier || !password || !role) {
//       return NextResponse.json(
//         { error: "identifier, password and role are required" },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({
//       role,
//       $or: [{ email: identifier }, { phone: identifier }],
//     });

//     if (!user)
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch)
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     // Generate JWT payload
//     const token = jwt.sign(
//       {
//         sub: user._id.toString(),
//         role: user.role,
//       },
//       JWT_SECRET,
//       { expiresIn: JWT_EXPIRES_IN }
//     );

//     // Build response
//     const response = NextResponse.json({
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });

//     // Set secure HttpOnly cookie
//     response.cookies.set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     return response;
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET env var");
}

const JWT_EXPIRES_IN = "1d";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { identifier, password, role } = await req.json();

    if (!identifier || !password || !role) {
      return NextResponse.json(
        { error: "identifier, password and role are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      role,
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // Generate JWT token
    const token = jwt.sign({ sub: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return user + token in body (so Postman / frontend can use it easily)
    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
