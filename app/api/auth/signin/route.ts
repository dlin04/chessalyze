import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { username, password } = res;

  try {
  } catch (error) {
    return NextResponse.json({ error: "Error signing in" }, { status: 500 });
  }
}
