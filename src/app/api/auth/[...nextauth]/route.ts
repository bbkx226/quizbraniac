import { authOptions } from "@/lib/nextauth"; // Imports the authOptions object that contains the NextAuth.js configuration
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } // NextAuth needs both GET and POST handlers, for handling OAuth callbacks for example
// The exported handlers contain all the logic for session handling, OAuth callbacks, validating JWTs etc. 
// We can just use them to protect API routes and get user sessions.