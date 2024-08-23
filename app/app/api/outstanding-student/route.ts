import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import OutstandingStudent from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const res = await OutstandingStudent.find();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const data = await req.json();
    const { academicYear, typeOfOutstanding, ...nisitData } = data;
    const existingEntry = await OutstandingStudent.findOne({ academicYear });

    if (existingEntry) {
      // Check if the typeOfOutstanding exists within the data array
      const typeIndex = existingEntry.data.findIndex(
        (item: any) => item.typeOfOutstanding === typeOfOutstanding
      );

      if (typeIndex !== -1) {
        existingEntry.data[typeIndex].nisitData.push(nisitData);
      } else {
        existingEntry.data.push({
          typeOfOutstanding,
          nisitData: [nisitData],
        });
      }

      const updatedEntry = await existingEntry.save();
      return NextResponse.json(updatedEntry);
    } else {
      const newEntry = await OutstandingStudent.create({
        academicYear,
        data: [
          {
            typeOfOutstanding,
            nisitData: [nisitData],
          },
        ],
      });
      return NextResponse.json(newEntry);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
