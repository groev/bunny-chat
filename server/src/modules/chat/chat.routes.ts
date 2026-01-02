import { FastifyPluginAsync } from "fastify";
import { chatController } from "./chat.controller";
import { chatListModel, chatModel } from "./chat.model";

export const chatRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", fastify.protect);
  fastify.route({
    method: "POST",
    url: "/chats/:id",
    handler: chatController.handleChat,
    schema: {
      summary: "Handle chat streaming",
      tags: ["chat"],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.route({
    method: "POST",
    url: "/chats",
    preHandler: fastify.protect,
    handler: chatController.createChat,
    schema: {
      summary: "Handle chat streaming",
      tags: ["chat"],
    },
  });

  fastify.route({
    method: "GET",
    url: "/chats",
    preHandler: fastify.protect,
    handler: chatController.getChats,
    schema: {
      summary: "Handle chat streaming",
      tags: ["chat"],
      response: {
        200: chatListModel,
      },
    },
  });

  fastify.route({
    method: "GET",
    url: "/chats/:id",
    preHandler: fastify.protect,
    handler: chatController.getChat,
    schema: {
      summary: "Handle chat streaming",
      tags: ["chat"],
      response: {
        200: chatModel,
      },
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/chats/:id",
    preHandler: fastify.protect,
    handler: chatController.deleteChat,
    schema: {
      summary: "Handle chat streaming",
      tags: ["chat"],
    },
  });
};
