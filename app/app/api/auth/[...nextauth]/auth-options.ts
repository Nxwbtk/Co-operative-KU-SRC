import { connectToDatabase } from "@/lib/mongo-db";
import User from "@/models/user";
import { SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { randomBytes, randomUUID } from "crypto";
import jwt from "jsonwebtoken";

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
          const tokenData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          };
          const token = jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, { expiresIn: "1d" });
          return {
            ...tokenData,
            accessToken: token,
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
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
          accessToken: user.accessToken,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
