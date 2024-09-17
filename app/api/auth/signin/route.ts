import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { username, password } = res;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { message: "Email or username not registered" },
        { status: 404 }
      );
    }

    // check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    console.log("checking password");

    // deal with session management
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error signing in" }, { status: 500 });
  }
}
