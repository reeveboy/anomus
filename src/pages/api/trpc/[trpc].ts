import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

const prisma = new PrismaClient();

export const appRouter = trpc
  .router()
  .query("get-room", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      return prisma.room.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create-room", {
    input: z.object({
      name: z.string(),
      description: z.string().nullish(),
    }),
    resolve({ input }) {
      return prisma.room.create({
        data: input,
      });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
