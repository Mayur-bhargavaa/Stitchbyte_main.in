import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth";

export async function POST() {
  try {
    // Clear the session
    await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    // Even if there's an error, return success to clear client state
    return NextResponse.json({ success: true });
  }
}
