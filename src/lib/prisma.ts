import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  blogPrisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const mainDatabaseUrl = process.env.DATABASE_URL || process.env.BLOG_DATABASE_URL;

    return new PrismaClient({
      ...(mainDatabaseUrl
        ? {
            datasources: {
              db: {
                url: mainDatabaseUrl,
              },
            },
          }
        : {}),
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  })();

const blogDatabaseUrl = process.env.BLOG_DATABASE_URL || process.env.DATABASE_URL;

const blogPrismaConfig = {
  log: process.env.NODE_ENV === "development" ? (["warn", "error"] as const) : (["error"] as const),
  ...(blogDatabaseUrl
    ? {
        datasources: {
          db: {
            url: blogDatabaseUrl,
          },
        },
      }
    : {}),
};

export const blogPrisma =
  globalForPrisma.blogPrisma ??
  new PrismaClient(blogPrismaConfig);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.blogPrisma = blogPrisma;
}
