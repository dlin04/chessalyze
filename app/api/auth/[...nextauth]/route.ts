import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name || null,
          },
          create: {
            email: user.email,
            name: user.name || null,
          },
        });
      } catch (error) {
        console.error("Failed to upsert user:", error);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
