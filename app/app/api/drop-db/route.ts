import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import Faculty from "@/models/faculty";
import Major from "@/models/major";
import OutStandingNisit from "@/models/outstanding-std";
import StudentClub from "@/models/std-club";
import TypeOfAward from "@/models/type-of-award";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return rejectForbidden();
  }
  try {
    await connectToDatabase();
        await Promise.all([
      StudentClub.collection.drop(),
      OutStandingNisit.collection.drop(),
      TypeOfAward.collection.drop(),
      Major.collection.drop(),
      Faculty.collection.drop()
    ]);
    return NextResponse.json({ message: "Database dropped" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to drop database" });
  }
}
