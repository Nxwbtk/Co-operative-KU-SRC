import { checkHeaders } from "@/lib/check-headers";
import { rejectUnauthorization } from "@/lib/reject-unauthorization";
import OutstandingStudent from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    if (!checkHeaders(req)) {
        return rejectUnauthorization();
    }
    const { id } = params;
    try {

    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    };
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkHeaders(req)) {
      return rejectUnauthorization();
  }
  try {
    const { id } = params;
    // const ostd = await OutstandingStudent.findOne({  });
    return NextResponse.json({ message: "Delete success" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}