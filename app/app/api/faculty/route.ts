import { connectToDatabase } from "@/lib/mongo-db";
import Faculty from "@/models/faculty";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const faculty = await Faculty.find();
    return (NextResponse.json(faculty));
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}