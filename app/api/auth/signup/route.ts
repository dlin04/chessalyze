import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, username, password } = req;

    const [existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({
        where: { username },
      }),
      prisma.user.findUnique({
        where: { email },
      }),
    ]);

    // first checking if email is registered
    if (existingEmail) {
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

    // user created successfully, does alert() and tells user to go to signin route
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error signing up" }, { status: 500 });
  }
}
