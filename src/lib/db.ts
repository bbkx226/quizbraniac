import { PrismaClient } from "@prisma/client"; // PrismaClient provides the Prisma client for database access
import "server-only"; // server-only ensures this code only runs on the server
 
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient; // cache a Prisma client instance for re-use
}
 
export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") { // In production, create a new PrismaClient on every request
  prisma = new PrismaClient(); 
} else {
  if (!global.cachedPrisma) { 
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma; 
}

// This provides optimized Prisma client usage in both dev and prod environments
// Dev uses a singleton cached client for performance
// Prod creates a new client on every request for safety