import { connectToDatabase } from "@/lib/mongo-db";
import OutStandingNisit from "@/models/outstanding-std";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const years: string[] = await OutStandingNisit.aggregate([
        { $group: { _id: '$academic_year' } },
        { $sort: { _id: -1 } },
        { $project: { _id: 0, academic_year: '$_id' } }
      ]).then(results => results.map(item => item.academic_year));
    return NextResponse.json(years);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
