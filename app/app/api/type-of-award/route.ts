"use server";

import { checkHeaders } from "@/lib/check-headers";
import { connectToDatabase } from "@/lib/mongo-db";
import TypeOfAward from "@/models/type-of-award";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const typeOfAward = await TypeOfAward.find();
    return NextResponse.json(typeOfAward);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const data = await req.json();
    const isAlreadyExist = await TypeOfAward.findOne({ name: data.name });
    if (isAlreadyExist) {
      throw new Error("Already exist");
    }
    const typeOfAward = await TypeOfAward.create(data);
    return NextResponse.json(typeOfAward);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
