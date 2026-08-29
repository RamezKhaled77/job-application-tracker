import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(); // Use the default database specified in the connection string

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    transaction: false, // For fix the error
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export async function getSession() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });

  return res;
}

export async function signOut() {
  const res = await auth.api.signOut({
    headers: await headers(),
  });

  if (res.success) {
    redirect("/sign-in");
  }
}
