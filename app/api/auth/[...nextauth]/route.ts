import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      if (!email) {
        console.error("User email is missing.");
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email,
            },
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
