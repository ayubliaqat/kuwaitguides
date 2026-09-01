import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  max: 1,              // one connection per serverless function instance — correct for serverless
  idle_timeout: 60,     // was 20s — keep the connection alive longer between requests so it can be reused
  max_lifetime: 60 * 30, // recycle a connection after 30 min regardless, avoids stale/broken connections
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });