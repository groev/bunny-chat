import fp from "fastify-plugin";
import SSE from "@fastify/sse";

export const sse = fp(async (fastify) => {
  await fastify.register(SSE);
});
