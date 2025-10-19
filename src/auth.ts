import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode"
export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();

        if (payload.message === "success") {
          const decodedToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodedToken.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "wrong credential");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user; // token.user معروف الآن
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      // استخدم type assertion لتأكيد النوع
      session.user = token.user as {
        name: string;
        email: string;
        role: string;
      };
      return session;
    },
  },
};
