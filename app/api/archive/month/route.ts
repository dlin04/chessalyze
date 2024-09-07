import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  try {
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user from Chess.com API" },
      { status: 500 }
    );
  }
}
