import { connectToDatabase } from "@/lib/mongo-db";
import StudentClub from "@/models/std-club";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const studentClubs = await StudentClub.find({}, { _id: 1, major: 1 });
    return NextResponse.json(studentClubs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching student clubs" },
      { status: 500 }
    );
  }
}
