import { connectToDatabase } from "@/lib/mongo-db";
import OutstandingStudent from "@/models/outstanding-std";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const res = await OutstandingStudent.find();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}