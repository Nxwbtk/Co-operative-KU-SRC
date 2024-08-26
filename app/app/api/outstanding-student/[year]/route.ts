import { connectToDatabase } from "@/lib/mongo-db";
import OutstandingStudent from "@/models/outstanding-std";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { year: string } }) {
    try {
        await connectToDatabase();
        const res = await OutstandingStudent.findOne({ academicYear: params.year });
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    };
};