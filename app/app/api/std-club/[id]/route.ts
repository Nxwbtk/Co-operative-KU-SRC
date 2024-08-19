import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import StudentClub from "@/models/std-club";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    if (!checkHeaders(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    try {
        await connectToDatabase();
        await StudentClub.findOneAndDelete({ _id: id });
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while deleting the student club" }, { status: 500 });
    }
}