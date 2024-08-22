import { checkHeaders } from '@/lib/check-headers';
import { connectToDatabase } from '@/lib/mongo-db';
import StudentClub from '@/models/std-club';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try{
    await connectToDatabase();
    const studentClubs = await StudentClub.find({});
    return NextResponse.json(studentClubs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while fetching student clubs" }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  if (!checkHeaders(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Ensure body is an object
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { academicYear } = body;
    const currentYear = new Date().getFullYear();

    if (parseInt(academicYear, 10) > currentYear) {
      return NextResponse.json({ error: 'ปีการศึกษาไม่สามารถมากกว่าปีปัจจุบัน' }, { status: 400 });
    }

    await connectToDatabase();
    await StudentClub.create(body);
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    // Ensure the connection is closed in case of an error
    console.log(error);
    return NextResponse.json({ error: "An error occurred while creating the student club" }, { status: 500 });
  }
}
