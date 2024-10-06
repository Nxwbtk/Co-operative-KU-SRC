import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import OutStandingNisit from "@/models/outstanding-std";
import TypeOfAward from "@/models/type-of-award";
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
    const updated = await TypeOfAward.findByIdAndUpdate(params.id, payload);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const ostd = await OutStandingNisit.find({ type_of_award_id: params.id });
    if (ostd.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete type of award that is being used" },
        { status: 400 }
      );
    }
    const deleted = await TypeOfAward.findByIdAndDelete(params.id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}