import { connectToDatabase } from "@/lib/mongo-db";
import Faculty from "@/models/faculty";
import Major from "@/models/major";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const major = await Major.find();
    return NextResponse.json(major);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { majorData } = await req.json();
  try {
    await connectToDatabase();
    const groupedByFaculty = majorData.reduce((acc: any, item: any) => {
      if (!acc[item.faculty]) {
        acc[item.faculty] = [];
      }
      acc[item.faculty].push(item.name);
      return acc;
    }, {} as Record<string, string[]>);
    const updatePromises = Object.entries(groupedByFaculty).map(
      ([id, major]) => {
        console.log(id, major);
        return Faculty.findByIdAndUpdate(
          id,
          {
            $push: {
              majors: major,
            },
          },
          { new: true }
        );
      }
    );
    await Promise.all([Major.insertMany(majorData), ...updatePromises]);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
