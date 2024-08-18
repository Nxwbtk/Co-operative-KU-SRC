'use server'

import { connectToDatabase } from "@/lib/mongo-db";
import Faculty from "@/models/faculty";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const requst = req.json();

    const facultyByName = await Faculty.find({ name })
  } catch (error) {
  };
}