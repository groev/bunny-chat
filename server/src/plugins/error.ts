import { FastifyError } from "fastify";
import fp from "fastify-plugin";

export const errorHandler = fp(async (fastify) => {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    const errorString = `${request?.method} ${request?.url} | Error: ${error.statusCode} - ${error.message}`;

    fastify.log.deploy(errorString);
    return reply.send(error);
  });
});
