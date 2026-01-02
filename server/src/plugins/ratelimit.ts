import fp from "fastify-plugin";
import fastifyRateLimit from "@fastify/rate-limit";

export const rateLimit = fp(async (fastify) => {
  await fastify.register(fastifyRateLimit, {
    hook: "preHandler",
    global: false,
  });
});
