import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin && !isLoggedIn) {
        return false; // redirects to signIn page automatically
      }
      return true;
    },
  },
  providers: [], // filled in by the full auth.ts
};