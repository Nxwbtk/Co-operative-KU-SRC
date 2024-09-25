import { connectToDatabase } from "@/lib/mongo-db";
import OTP from "@/models/otp";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        await connectToDatabase();
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        await OTP.create({ email: body.email, otp: body.otp });
        return NextResponse.json({ data: "Success" });
    } catch (error) {
        return NextResponse.json({ error: "Fail" }, { status: 500 });
    };
}