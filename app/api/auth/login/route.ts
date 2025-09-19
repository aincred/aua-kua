import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { setSecurityHeaders } from '@/lib/headers';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    // Your validation logic here
    const credentials = {
      admin: { email: "admin@example.com", password: "admin123" },
      auditor: { email: "auditor@example.com", password: "auditor123" },
      department: { email: "department@example.com", password: "dept123" },
    };

    const user = credentials[role as keyof typeof credentials];
    if (!user || user.email !== email || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // Convert JWT_EXPIRES_IN from seconds to a future timestamp
    const expirationTime = Math.floor(Date.now() / 1000) + (parseInt(process.env.JWT_EXPIRES_IN || '3600'));
    
    const token = await new SignJWT({ email, role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expirationTime)
      .sign(secret);

    // Set HTTP-only cookie with enhanced security
    const cookieStore = await cookies();
    const maxAge = parseInt(process.env.JWT_EXPIRES_IN || '3600');
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: true, // Always use secure in production
      sameSite: 'strict',
      maxAge: maxAge,
      expires: new Date(Date.now() + maxAge * 1000),
      path: '/'
    });

    const response = NextResponse.json({ token });
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabaseClient';

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error || !data.session) {
//     return NextResponse.json({ error: error?.message }, { status: 401 });
//   }

//   return NextResponse.json({ session: data.session });
// }

// import { NextRequest } from "next/server";
// import { supabase } from "@/lib/supabaseClient";

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error || !data.user) {
//     return new Response(
//       JSON.stringify({ error: error?.message || "Authentication failed" }),
//       { status: 401 }
//     );
//   }

//   const { data: userDetails, error: fetchError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("email", email)
//     .single();

//   if (fetchError || !userDetails) {
//     return new Response(
//       JSON.stringify({ error: fetchError?.message || "Failed to fetch user role" }),
//       { status: 500 }
//     );
//   }

//   const token = data.session?.access_token;

//   return new Response(
//     JSON.stringify({ token, role: userDetails.role }),
//     { status: 200 }
//   );
// };

// import type { NextApiRequest, NextApiResponse } from "next";
// import { createClient } from "@supabase/supabase-js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// const JWT_SECRET = process.env.JWT_SECRET!;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, password, role } = req.body as { email: string; password: string; role: string };

//   if (!email || !password || !role) {
//     return res.status(400).json({ error: "Missing email, password, or role" });
//   }

//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("email", email)
//     .eq("role", role)
//     .single();

//   if (error || !data) {
//     return res.status(401).json({ error: "Invalid email, password, or role" });
//   }

//   const isValid = await bcrypt.compare(password, data.password);
//   if (!isValid) {
//     return res.status(401).json({ error: "Invalid email, password, or role" });
//   }

//   const token = jwt.sign({ userId: data.id, email: data.email, role: data.role }, JWT_SECRET, {
//     expiresIn: "8h",
//   });

//   return res.status(200).json({ token, role: data.role });
// }
