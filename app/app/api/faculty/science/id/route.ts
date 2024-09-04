import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import Faculty from "@/models/faculty";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const scienceId = await Faculty.findOne({ name: "คณะวิทยาศาสตร์ ศรีราชา" }, { _id: 1 });
    return NextResponse.json(scienceId);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}