import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    // const req = await request.json();
    // const {
    // accessToken,
    // whitePlayer,
    // whiteRating,
    // blackPlayer,
    // blackRating,
    // fenArray,
    // analysisArray,
    // } = req;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving game" }, { status: 500 });
  }
}
