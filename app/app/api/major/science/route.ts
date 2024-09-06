import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import Major from "@/models/major";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    const payload = await req.json();
    await connectToDatabase();
    const newMajor = await Major.create({ ...payload });
    return NextResponse.json(newMajor);
  } catch (error) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}
