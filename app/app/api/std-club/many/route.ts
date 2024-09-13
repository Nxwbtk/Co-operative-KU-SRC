import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectUnauthorization } from "@/lib/reject-middleware";
import StudentClub from "@/models/std-club";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (!checkHeaders(req)) {
        return rejectUnauthorization();
    }
    try {
        const body = await req.json();
        await connectToDatabase();
        await StudentClub.insertMany(body);
        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while creating the student club" }, { status: 500 });
    };
}