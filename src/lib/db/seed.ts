import { config } from "dotenv";
config({ path: ".env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "mayub7540@gmail.com";
  const plainPassword = "dev123";
  const name = "Ayub";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created:", email);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });