import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-middleware";
import OutStandingNisit from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }
  const { id } = params;
  const data = await req.json();
  try {
    await connectToDatabase();
    await OutStandingNisit.updateOne({ _id: id }, data);
    return NextResponse.json({ message: "Update success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }

  try {
    await connectToDatabase();

    const result = await OutStandingNisit.deleteOne({ _id: params.id });

    return NextResponse.json({ message: "Delete success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}