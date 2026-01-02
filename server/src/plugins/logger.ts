export const logger = {
  logger: {
    level: "warn",
    customLevels: {
      deploy: 41,
    },
    transport: {
      target: "pino-pretty",
      ignore: "pid,hostname,level",
      options: {
        ignore: "pid,hostname,level",
      },
    },
  },
};

declare module "fastify" {
  interface FastifyBaseLogger {
    deploy: (obj: object | string | unknown, msg?: string) => void;
  }
}
