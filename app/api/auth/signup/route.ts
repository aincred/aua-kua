// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // insert user and return inserted row
    const { data, error } = await supabase
      .from("users")
      .insert({
        email,
        password: hashedPassword,
        role,
      })
      .select("id, email, role") // only return safe fields
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: data,
      },
      { status: 201 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
