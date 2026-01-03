import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FastifyBetterAuth from "fastify-better-auth";
import fp from "fastify-plugin";
import { auth } from "@/modules/auth/service";
import { getAuthDecorator } from "fastify-better-auth";
import { fromNodeHeaders } from "better-auth/node";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }

  interface FastifyInstance {
    protect: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyReply {
    sendFile: (path: string) => void;
  }
}

async function authHandler(fastify: FastifyInstance) {
  await fastify.register(FastifyBetterAuth, { auth });

  fastify.decorate(
    "protect",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const auth = getAuthDecorator(fastify);
        const session = await auth.api.getSession({
          headers: fromNodeHeaders(request.headers),
        });

        if (!session?.user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        request.user = session.user;
      } catch (err) {
        throw fastify.httpErrors.unauthorized();
      }
    }
  );
}

export const authPlugin = fp(authHandler, {
  name: "auth-plugin",
});
