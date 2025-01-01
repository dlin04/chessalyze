import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log(refreshToken);

  return NextResponse.json({ message: "testing testing" });
}
