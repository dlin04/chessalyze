import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { email, username, password } = res;

    const [existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({
        where: { username },
      }),
      prisma.user.findUnique({
        where: { email },
      }),
    ]);

    console.log("existingEmail:", existingEmail);

    // first checking if email is registered
    if (existingEmail) {
      console.log("existing email");
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // next, ask to choose unique username
    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already registered" },
        { status: 409 }
      );
    }

    // all works, hash password and add to database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // deal with session management here?
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error signing up" }, { status: 500 });
  }
}
