import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-unauthorization";
import OutStandingNisit from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { year: string; award: string; id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }

  try {
    await connectToDatabase();

    const result = await OutStandingNisit.updateOne(
      { academicYear: params.year, "data.typeOfOutstanding": params.award },
      { $pull: { "data.$.nisitData": { _id: params.id } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Delete success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { year: string; award: string; id: string } }
) {
  if (!checkHeaders(req)) {
    return rejectUnauthorization();
  }

  try {
    await connectToDatabase();

    const body = await req.json();
    const { typeOfOutstanding, nisitData } = body;

    // Find the document first
    const document = await OutStandingNisit.findOne(
      { academicYear: params.year, "data.nisitData._id": params.id },
      { "data.$": 1 }
    );

    if (!document) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check if typeOfOutstanding exists in the data array
    const typeExists = document.data.some(
      (item: any) => item.typeOfOutstanding === typeOfOutstanding
    );

    if (!typeExists) {
      // Add new typeOfOutstanding if it doesn't exist
      const newType = {
        typeOfOutstanding: typeOfOutstanding,
        nisitData: [nisitData],
      };
      await OutStandingNisit.updateOne(
        { academicYear: params.year },
        { $push: { data: newType } }
      );
    } else {
      // Update the specific element in the nested array and typeOfOutstanding
      const result = await OutStandingNisit.updateOne(
        { academicYear: params.year, "data.typeOfOutstanding": params.award, "data.nisitData._id": params.id },
        {
          $set: {
            "data.$[outer].nisitData.$[inner]": nisitData,
            "data.$[outer].typeOfOutstanding": typeOfOutstanding,
            academicYear: body.academicYear
          }
        },
        { arrayFilters: [{ "outer.typeOfOutstanding": params.award }, { "inner._id": params.id }] }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      // Remove nisitData from the old typeOfOutstanding if it's been moved
      await OutStandingNisit.updateOne(
        { academicYear: params.year, "data.typeOfOutstanding": params.award },
        {
          $pull: {
            "data.$.nisitData": { _id: params.id }
          }
        }
      );

      // Remove old typeOfOutstanding if no nisitData remains
      await OutStandingNisit.updateOne(
        { academicYear: params.year },
        {
          $pull: {
            data: { typeOfOutstanding: params.award, nisitData: { $size: 0 } }
          }
        }
      );
    }

    return NextResponse.json({ message: "Update success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error || 'Server error' }, { status: 500 });
  }
}