'use server'

import { NextResponse } from "next/server"

export async function POST (req: any) {
  try {
    const { email, password } = await req.json();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}