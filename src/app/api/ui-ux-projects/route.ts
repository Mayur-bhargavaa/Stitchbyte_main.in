import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import UiUxProject from "@/models/UiUxProject";

export async function GET() {
  try {
    await connectDB();

    const projects = await UiUxProject.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching UI/UX projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch UI/UX projects" },
      { status: 500 }
    );
  }
}
