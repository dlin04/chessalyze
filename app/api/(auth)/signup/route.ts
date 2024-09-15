import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { username, password } = res;
    console.log("username: ", username);
    console.log("password:", password);
  } catch (error) {
    return NextResponse.json({ error: "Error signing up" }, { status: 500 });
  }
}
