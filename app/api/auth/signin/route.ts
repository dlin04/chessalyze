import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { username, password } = req;

    console.log("received info:", username, password);

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email / username not registered" },
        { status: 404 }
      );
    }

    console.log("got past this");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      accessToken,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error signing in" }, { status: 500 });
  }
}
