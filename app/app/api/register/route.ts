"use server";

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo-db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  const { firstName, lastName, email, password } = await req.json();
  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    await User.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
    });
    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
