import { RouteHandler } from "fastify";

export type Controller = {
  [key: string]: RouteHandler<any>;
};
