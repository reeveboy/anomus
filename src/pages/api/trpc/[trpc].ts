import { PrismaClient } from "@prisma/client";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { createRouter, createContext } from "../../../server/router/context";

const prisma = new PrismaClient();

const roomRouter = createRouter()
  .query("get-room", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ input }) {
      return prisma.room.findFirst({
        where: {
          id: input.id,
        },
        include: {
          Message: true,
        },
      });
    },
  })
  .mutation("create-room", {
    input: z.object({
      name: z.string(),
      description: z.string().nullish(),
      ownerId: z.string(),
    }),
    resolve({ input }) {
      return prisma.room.create({
        data: input,
      });
    },
  })
  .query("get-user-rooms", {
    input: z.object({
      ownerId: z.string(),
    }),
    resolve({ input }) {
      return prisma.room.findMany({
        where: input,
        select: {
          id: true,
          name: true,
          description: true,
          ownerId: true,
          _count: {
            select: { Message: true },
          },
        },
      });
    },
  });

const messageRouter = createRouter()
  .mutation("create-message", {
    input: z.object({
      message: z.string(),
      roomId: z.string(),
    }),
    resolve({ input }) {
      return prisma.message.create({
        data: input,
      });
    },
  })
  .query("get-messages", {
    input: z.object({
      roomId: z.string(),
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
