import { User } from "@/generated/prisma/client";
import { prisma } from "@/util/prsima";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const chatService = {
  streamResponse: async (messages: UIMessage[], chatId: string) => {
    const lastUserMessage = messages[messages.length - 1];

    if (
      lastUserMessage &&
      lastUserMessage.role === "user" &&
      messages.length > 1
    ) {
      if (lastUserMessage.parts[0].type === "text") {
        await prisma.message.create({
          data: {
            chatId,
            text: lastUserMessage.parts[0].text,
            role: "user",
          },
        });
      }
    }
    const result = streamText({
      model: "xai/grok-4.1-fast-non-reasoning",
      maxOutputTokens: 1000,
      messages: [...(await convertToModelMessages(messages))],
      onFinish: async ({ text }) => {
        await prisma.message.create({
          data: {
            chatId,
            text: text,
            role: "assistant",
          },
        });
      },
    });

    return result.toUIMessageStreamResponse();
  },

  createChat: async (user: User, message: string) => {
    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        title: message.substring(0, 50),
        messages: {
          create: {
            text: message,
            role: "user",
          },
        },
      },
    });
    return chat;
  },

  getChat: async (id: string, userId: string) => {
    const chat = await prisma.chat.findFirst({
      where: {
        id: id,
      },
      include: {
        messages: true,
      },
    });
    return chat;
  },

  getChats: async (userId?: string) => {
    const chats = await prisma.chat.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: userId,
      },
      include: {
        messages: true,
      },
    });
    return chats;
  },

  deleteChat: async (id: string, userId: string) => {
    const chat = await prisma.chat.delete({
      where: {
        id,
        userId,
      },
    });
    return chat;
  },
};
