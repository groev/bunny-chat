import fp from "fastify-plugin";
import fastifySensible from "@fastify/sensible";

export const sensible = fp(async (fastify) => {
  await fastify.register(fastifySensible);
});
