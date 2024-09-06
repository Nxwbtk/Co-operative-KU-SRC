import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import { rejectForbidden } from "@/lib/reject-middleware";
import TypeOfAward from "@/models/type-of-award";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (!checkHeaders(req)) {
        return rejectForbidden();
    }
    try {
        const body = await req.json();
        await connectToDatabase();
        await TypeOfAward.insertMany(body);
        return NextResponse.json({ message: "Type of award created" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create type of award" });
    }
}