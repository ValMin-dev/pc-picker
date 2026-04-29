// Настройка авторизации через NextAuth и email/password.
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || typeof credentials.email !== "string")
          return null;
        if (!credentials.password || typeof credentials.password !== "string")
          return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const isValid = user
          ? await bcrypt.compare(credentials.password, user.password)
          : false;
        if (!isValid) return null;

        return {
          id: user?.id as string,
          email: user?.email as string,
          name: user?.name as string,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
