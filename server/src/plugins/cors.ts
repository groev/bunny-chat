import fp from "fastify-plugin";
import { config } from "../util/config";

export const cors = fp(async (fastify) => {
  await fastify.register(require("@fastify/cors"), {
    origin: [config.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  });
});
