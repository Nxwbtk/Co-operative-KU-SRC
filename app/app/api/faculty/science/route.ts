'use server'

import { connectToDatabase } from "@/lib/mongo-db"
import Faculty from "@/models/faculty";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const scienceFaculty = await Faculty.findOne({ name: "คณะวิทยาศาสตร์ ศรีราชา" });
    return NextResponse.json(scienceFaculty);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  };
}