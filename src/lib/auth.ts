import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongodb";
import type { AdminUser } from "@/types";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const admins = await getCollection<AdminUser>("admins");
          const user = await admins.findOne({
            email: credentials.email.trim().toLowerCase(),
          });
          if (!user) return null;
          const isValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );
          if (!isValid) return null;
          return {
            id: String(user._id),
            email: user.email,
            name: user.name,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : undefined;
      }
      return session;
    },
  },
};

/** Guard helper: true when a session with a signed-in user exists. */
export function isAdminSession(session: Session | null): session is Session {
  return Boolean(session?.user);
}