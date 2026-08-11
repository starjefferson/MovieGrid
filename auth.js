import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const hasFirebaseAdminKeys =
  Boolean(process.env.AUTH_FIREBASE_PROJECT_ID) &&
  Boolean(process.env.AUTH_FIREBASE_CLIENT_EMAIL) &&
  Boolean(process.env.AUTH_FIREBASE_PRIVATE_KEY);

const adapter = hasFirebaseAdminKeys
  ? FirestoreAdapter({
      credential: cert({
        projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    })
  : undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "moviegrid-default-secret-key-2026",
  ...(adapter ? { adapter } : {}),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🚨 No database check — accept any input
        const { email } = credentials;
        return {
          id: Date.now().toString(), // generate a simple ID
          name: email.split("@")[0], // use part of email as name
          email,
        };
      },
    }),
  ],
});