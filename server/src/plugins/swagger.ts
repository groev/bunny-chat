import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  createJsonSchemaTransform,
  createJsonSchemaTransformObject,
} from "@marcalexiei/fastify-type-provider-zod";

export const swagger = fp(async function (server: FastifyInstance) {
  server.register(fastifySwagger, {
    openapi: {
      info: { title: "plate assistant api", version: "1.0.0" },
      servers: [],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    transform: createJsonSchemaTransform(),
    transformObject: createJsonSchemaTransformObject(),
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "full", deepLinking: true },
    staticCSP: true,
    transformSpecificationClone: false,
  });

  server.get("/docs/spec.json", async (req, res) => {
    res.header("Cache-Control", "no-store");
    return res.send(server.swagger());
  });
});
