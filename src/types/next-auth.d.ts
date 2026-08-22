import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "editor";
    } & DefaultSession["user"];
  }

  interface User {
    role: "admin" | "editor";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "editor";
  }
}