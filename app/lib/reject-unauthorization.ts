import { NextResponse } from "next/server";

export const rejectUnauthorization = () => {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};
