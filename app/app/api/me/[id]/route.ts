import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-middleware";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }
  try {
    await connectToDatabase();
    const res = await User.findById(params.id);
    if (!res) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }
  try {
    const data = await req.json();
    await connectToDatabase();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.set(data);
    await user.save();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
