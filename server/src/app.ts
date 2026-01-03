import { FastifyInstance } from "fastify";

import {
  createSerializerCompiler,
  createValidatorCompiler,
} from "@marcalexiei/fastify-type-provider-zod";

import UnderPressure from "@fastify/under-pressure";
import type { ZodTypeProvider } from "@marcalexiei/fastify-type-provider-zod";

import { prisma } from "./util/prsima";

import { cors } from "./plugins/cors";
import { sse } from "./plugins/sse";
import { sensible } from "./plugins/sensible";
import { rawbody } from "./plugins/rawbody";
import { helmet } from "./plugins/helmet";
import { errorHandler } from "./plugins/error";
import { swagger } from "./plugins/swagger";
import path from "node:path";

import { authPlugin } from "./plugins/auth";
import { chatRoutes } from "./modules/chat/chat.routes";

export async function app(server: FastifyInstance) {
  globalThis.AI_SDK_LOG_WARNINGS = false;

  // 1. Core Security & Utility Plugins
  await server.register(cors);
  await server.register(helmet);
  await server.register(sensible);
  server.register(authPlugin);
  server.register(swagger);

  // 2. Specialized Plugins
  await server.register(sse);
  await server.register(rawbody);
  await server.register(UnderPressure);
  await server.register(errorHandler);

  // 3. Type Providers
  server.withTypeProvider<ZodTypeProvider>();
  server.setValidatorCompiler(createValidatorCompiler());
  server.setSerializerCompiler(createSerializerCompiler());

  // 4. Routes & Controllers
  await server.register(
    async (fastify) => {
      await fastify.register(chatRoutes);
    },
    { prefix: "/api" }
  );

  server.get("/health", async (_, res) => {
    const dbIsUp = await prisma.$queryRaw`SELECT 1;`;
    if (dbIsUp) {
      res.status(200).send({
        status: "ok",
        message: "api is running",
      });
      return;
    }
    res.status(500).send("api is down");
  });

  server.register(require("@fastify/static"), {
    root: path.join(__dirname, "../../client/dist"),
    prefix: "/",
  });

  server.setNotFoundHandler((req, res) => {
    res.status(200).sendFile("index.html");
  });

  await server.ready();
}
