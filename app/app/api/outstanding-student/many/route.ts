import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-middleware";
import OutStandingNisit from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }
  const data = await req.json();
  try {
    await connectToDatabase();
    await OutStandingNisit.insertMany(data);
    return NextResponse.json({ message: "Create success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
