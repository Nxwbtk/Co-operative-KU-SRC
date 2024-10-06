import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import Major from "@/models/major";
import OutStandingNisit from "@/models/outstanding-std";
import StudentClub from "@/models/std-club";
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const [clublen, ostdlen] = await Promise.all([
      StudentClub.find({ major: params.id }),
      OutStandingNisit.find({ major_id: params.id }),
    ]);
    const total = clublen.length + ostdlen.length;
    if (total > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete this major because it is used in student club",
        },
        { status: 400 }
      );
    }
    const deleted = await Major.findByIdAndDelete(params.id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
