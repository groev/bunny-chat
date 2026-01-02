import { z } from "zod";

export const messageModel = z.object({
  chatId: z.string(),
  id: z.string(),
  text: z.string(),
  role: z.enum(["user", "assistant"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const chatModel = z.object({
  id: z.string(),
  userId: z.string(),
  messages: z.array(messageModel),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
});

export const chatListModel = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    title: z.string(),
  })
);
