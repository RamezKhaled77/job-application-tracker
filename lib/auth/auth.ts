import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

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
