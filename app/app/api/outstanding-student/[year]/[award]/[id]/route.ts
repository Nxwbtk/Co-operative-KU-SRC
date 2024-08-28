import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-unauthorization";
import OutstandingStudent from "@/models/outstanding-std";
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

    const result = await OutstandingStudent.updateOne(
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
