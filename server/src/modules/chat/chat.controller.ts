import { FastifyRequest } from "fastify";
import { UIMessage } from "ai";

import { chatService } from "./chat.service";
import { Controller } from "@/util/types";

export const chatController: Controller = {
  handleChat: async (
    request: FastifyRequest<{
      Body: { messages: UIMessage[] };
      Params: { id: string };
    }>,
    reply
  ) => {
    try {
      const response = await chatService.streamResponse(
        request.body.messages,
        request.params.id
      );
      return reply
        .header("X-Vercel-AI-Data-Stream", "v1")
        .header("Content-Type", "text/plain; charset=utf-8")
        .send(response);
    } catch (error) {
      return reply.internalServerError();
    }
  },

  createChat: async (
    request: FastifyRequest<{
      Body: { message: string };
    }>,
    reply
  ) => {
    try {
      const create = await chatService.createChat(
        request.user,
        request.body.message
      );
      return reply.status(201).send(create);
    } catch (error) {
      return reply.internalServerError();
    }
  },

  getChats: async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply
  ) => {
    try {
      const chats = await chatService.getChats(request.user.id);
      return reply.status(200).send(chats);
    } catch (error) {
      return reply.internalServerError();
    }
  },

  getChat: async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply
  ) => {
    try {
      const chat = await chatService.getChat(
        request.params.id,
        request.user.id
      );
      return reply.status(200).send(chat);
    } catch (error) {
      return reply.internalServerError();
    }
  },

  deleteChat: async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply
  ) => {
    try {
      const chat = await chatService.deleteChat(
        request.params.id,
        request.user.id
      );
      return reply.status(200).send(chat);
    } catch (error) {
      return reply.internalServerError();
    }
  },
};
