import { connectToDatabase } from "@/lib/mongo-db";
import User from "@/models/user";
import { SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectToDatabase();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
