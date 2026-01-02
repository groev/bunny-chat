import fp from "fastify-plugin";
import helmetPlugin from "@fastify/helmet";

export const helmet = fp(async (fastify) => {
  await fastify.register(helmetPlugin);
});
