import { app } from "@/app";
import GracefulServer from "@gquittet/graceful-server";
import Fastify from "fastify";

import { config } from "./util/config";
import { logger } from "./plugins/logger";

async function init() {
  const fastify = Fastify(logger);

  await app(fastify);

  const gracefulServer = GracefulServer(fastify.server, {});

  gracefulServer.on(GracefulServer.READY, () => {
    fastify.log.deploy(`Server is reading on port ${config.PORT}`);
  });

  gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
    fastify.log.deploy("Server is shutting down");
  });

  gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
    fastify.log.deploy("Server is down because of", error.message);
  });

  try {
    await fastify.listen({ port: Number(config.PORT), host: "0.0.0.0" });
    gracefulServer.setReady();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

init();
