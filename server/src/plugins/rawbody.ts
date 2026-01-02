import fp from "fastify-plugin";

import rawbodyPlugin, { RawBodyPluginOptions } from "fastify-raw-body";

export const rawbody = fp<RawBodyPluginOptions>(async (fastify) => {
  fastify.register(rawbodyPlugin, {
    field: "rawBody",
    global: false,
    encoding: false,
    runFirst: true,
  });
});
