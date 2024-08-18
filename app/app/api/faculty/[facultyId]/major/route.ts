import { connectToDatabase } from "@/lib/mongo-db";
import Major from "@/models/major";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { facultyId: string } }) {
  const { facultyId } = params;
  try {
    await connectToDatabase();
    const majorByFacultyId = await Major.find({ faculty: facultyId });
    return NextResponse.json(majorByFacultyId);
  } catch (error) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}
