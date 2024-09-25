import { connectToDatabase } from "@/lib/mongo-db";
import OTP from "@/models/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await connectToDatabase();
    const otp = await OTP.findOne({ otp: body.otp });
    if (!otp) {
      return NextResponse.json({ error: "OTP not found" }, { status: 404 });
    }
    return NextResponse.json({ data: otp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Fail" }, { status: 500 });
  }
}
