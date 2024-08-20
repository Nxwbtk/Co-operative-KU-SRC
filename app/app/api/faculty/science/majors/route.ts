import { connectToDatabase } from "@/lib/mongo-db";
import Faculty from "@/models/faculty";
import Major from "@/models/major";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const faculty = await Faculty.findOne({ name: "คณะวิทยาศาสตร์ ศรีราชา" });
    const facultyId = faculty._id;
    const majors = await Major.find({ faculty: facultyId });
    const scienceFacultyAndMajors = await Faculty.aggregate([
      { $match: { name: "คณะวิทยาศาสตร์ ศรีราชา" } },
      {
        $lookup: {
          from: "majors",
          localField: "_id",
          foreignField: "faculty",
          as: "majorsAndId",
        },
      },
    ]);
    return NextResponse.json(scienceFacultyAndMajors);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
