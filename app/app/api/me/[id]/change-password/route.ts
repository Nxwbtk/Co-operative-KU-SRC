import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-middleware";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(
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
    if (
      bcrypt.compareSync(data.oldPassword, await bcrypt.hash(user.password, 10))
    ) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 }
      );
    }
    if (data.newPassword !== data.confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password are not match" },
        { status: 400 }
      );
    }
    user.password = await bcrypt.hash(data.newPassword, 10);
    await user.save();
    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
