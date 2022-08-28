import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { createRouter, createContext } from "../../../server/router/context";
import { createProtectedRouter } from "../../../server/router/protected-router";

const prisma = new PrismaClient();

const roomRouter = createRouter()
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
    resolve({ input, ctx }) {
      // @ts-ignore
      if (!ctx.session?.user.id) {
        throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
      }
      return prisma.room.create({
        data: {
          name: input.name,
          description: input.description,
          // @ts-ignore
          userId: ctx.session?.user.id,
        },
      });
    },
  });

const messageRouter = createRouter()
  .mutation("create-message", {
    input: z.object({
      message: z.string(),
      roomId: z.number(),
    }),
    resolve({ input }) {
      return prisma.message.create({
        data: input,
      });
    },
  })
  .query("get-messages", {
    input: z.object({
      roomId: z.number(),
    }),
    resolve({ input }) {
      return prisma.message.findMany({
        where: {
          roomId: input.roomId,
        },
      });
    },
  });

const sessionRouter = createRouter().query("getSession", {
  resolve({ ctx }) {
    return ctx.session;
  },
});

export const appRouter = createRouter()
  .merge("room.", roomRouter)
  .merge("message.", messageRouter)
  .merge("auth.", sessionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prisma.$disconnect(),
});
