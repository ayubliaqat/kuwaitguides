"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "editor"]),
});

export async function getAllUsers() {
  return db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt })
    .from(users);
}

export async function createUser(data: unknown) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") throw new Error("Not authorized");

  const parsed = createUserSchema.parse(data);
  const hashedPassword = await bcrypt.hash(parsed.password, 10);

  await db.insert(users).values({
    name: parsed.name,
    email: parsed.email,
    password: hashedPassword,
    role: parsed.role,
  });

  redirect("/admin/users");
}