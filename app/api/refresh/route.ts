import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("trying to get refresh token here:", refreshToken);

  return NextResponse.json({ message: "testing testing" });
}
