import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import Major from "@/models/major";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const payload = await req.json();
    const updated = await Major.findByIdAndUpdate(params.id, payload);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}