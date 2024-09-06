import { NextResponse } from "next/server";

export const rejectUnauthorization = () => {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

export const rejectForbidden = () => {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}