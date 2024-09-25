import { checkHeadersSuperAdmin } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  if (!checkHeadersSuperAdmin(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
    const user = await User.find(
      {},
      { password: 0, posted: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkHeadersSuperAdmin(req)) {
    return rejectForbidden();
  }
  try {
    const { payload } = await req.json();
    const hasedPassword = await bcrypt.hash(payload.password, 10);
    const newPayload = {
      ...payload,
      password: hasedPassword,
    };
    await connectToDatabase();
    const isAlreadyUser = await User.findOne({
      email: payload.email,
    });
    if (isAlreadyUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    await User.insertMany(newPayload);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, password } = body;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    await User.findByIdAndUpdate(id, {
      password: bcrypt.hash(password, 10)
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
