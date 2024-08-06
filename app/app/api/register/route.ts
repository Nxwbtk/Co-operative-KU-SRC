"use server";

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo-db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  console.log(req.json().body);
  try {
    const { firstName, lastName, email, password } = await req.json();
    const hasedPassword = await bcrypt.hash(password, 42);
    console.log(hasedPassword);
    await connectToDatabase();
    await User.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
