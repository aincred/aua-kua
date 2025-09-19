// app/api/save-compliance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { control_id, checked_evidences, uploaded_files, comment } = body;

    const { data, error } = await supabase
      .from("compliance_answers")
      .insert([
        {
          control_id,
          checked_evidences,
          uploaded_files,
          comment,
        },
      ]);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    // Log internally for debugging
    console.error("Error saving compliance:", err);

    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

