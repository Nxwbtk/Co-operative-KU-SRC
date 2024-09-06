import { connectToDatabase } from "@/lib/mongo-db";
import Major from "@/models/major";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { facultyId: string } }) {
  const { facultyId } = params;
  try {
    await connectToDatabase();
    const majorByFacultyId = await Major.find({ faculty: facultyId });
    return NextResponse.json(majorByFacultyId);
  } catch (error) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { facultyId: string } }) {
  const { facultyId } = params;
  try {
    const payload = await req.json();
    await connectToDatabase();
    const newMajor = await Major.create({ ...payload, faculty: facultyId });
    return NextResponse.json(newMajor);
  } catch (error) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}