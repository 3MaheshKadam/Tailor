// lib/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in environment");

export type TokenPayload = { sub: string; role: string; iat?: number; exp?: number };

/** Parse JWT token from Authorization: Bearer <token> header and verify it. */
export function parseTokenFromRequest(req: Request | NextRequest): TokenPayload | null {
  try {
    const auth = (req as Request).headers?.get?.("authorization") || (req as NextRequest).headers?.get?.("authorization");
    if (!auth) return null;
    const parts = auth.split(" ");
    if (parts.length !== 2) return null;
    if (parts[0] !== "Bearer") return null;
    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Require that the request has a valid token and that payload.role is in allowedRoles.
 * Throws a Next.js Response (401/403) on failure.
 */
export function requireRole(req: Request | NextRequest, allowedRoles: string[]) {
  const payload = parseTokenFromRequest(req);
  if (!payload) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  if (!allowedRoles.includes(payload.role)) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }
  return payload;
}
