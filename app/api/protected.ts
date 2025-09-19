// app/api/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json(
      { message: "Access granted", user: decoded },
      { status: 200 }
    );
  } catch (err) {
    // log internally for debugging
    console.error("JWT verification failed:", err);

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
