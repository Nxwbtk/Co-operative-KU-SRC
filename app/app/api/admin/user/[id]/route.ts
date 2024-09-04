import { checkHeadersSuperAdmin } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeadersSuperAdmin(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  if (!checkHeadersSuperAdmin(req)) {
    return rejectForbidden();
  }
  try {
    const payload = await req.json();
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(params.id, payload);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}