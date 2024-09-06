import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import verifyToken from "@/lib/verify-token";
import Faculty from "@/models/faculty";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const faculty = await Faculty.find();
    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { payload } = await req.json();
  await connectToDatabase();
  await Faculty.insertMany(payload);
  return NextResponse.json({ message: "Success" });
}
