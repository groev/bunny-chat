import {
  ScrollArea,
  Flex,
  Stack,
  Container,
  Box,
  AppShell,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { useParams } from "react-router-dom";

import { useEffect, useMemo, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import Chatbox from "../Chatbox";
import Toggle from "../Layout/Toggle";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/util/api";
import type { GetApiChatsId200 } from "@/gen/types";

export default function ChatPage() {
  const { id } = useParams();

  const { data: chat } = useQuery<GetApiChatsId200>({
    queryKey: ["chats", id],
    queryFn: async () => await api.get(`/chats/${id}`),
  });

  const form = useForm({
    initialValues: { message: "" },
  });

  const history = chat?.messages?.map((item) => {
    return {
      role: item.role,
      parts: [
        {
          type: "text",
          text: item.text,
        },
      ],
    };
  }) as UIMessage[];

  const {
    messages,
    sendMessage,
    status,
    setMessages,
    id: chatId,
  } = useChat({
    id: id,
    transport: new DefaultChatTransport({
      api: `/api/chats/${id}`,
    }),
    messages: history || [],
  });

  useEffect(() => {
    if (chatId !== id) return;
    if (history && history?.length > 1 && messages.length === 0) {
      return setMessages(history || []);
    }
  }, [history, id]);

  const hasTriggered = useRef<string | null>(null);

  useEffect(() => {
    if (!history || history.length === 0 || hasTriggered.current === id) return;

    const lastMessage = history[history.length - 1];
    const needsResponse = history.length === 1 && lastMessage.role === "user";

    if (needsResponse && status === "ready") {
      hasTriggered.current = id!;

      const text =
        lastMessage.parts?.[0]?.type === "text"
          ? lastMessage.parts[0].text
          : (lastMessage as any).content;

      sendMessage({ text });
    }
  }, [history, status, id]);

  const handleProcessForm = async (values: typeof form.values) => {
    if (!values.message.trim() || status !== "ready") return;
    const text = values.message;
    form.reset();

    sendMessage({ text });
  };

  const viewport = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatTurns = useMemo(() => {
    return messages.reduce((acc, message, i) => {
      if (message.role === "user") {
        acc.push({ user: message, assistant: messages[i + 1] });
      }
      return acc;
    }, [] as { user: UIMessage; assistant?: UIMessage }[]);
  }, [messages]);

  const scrollToLastUserMessage = () => {
    if (viewport.current) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.role === "user");

      if (lastUserMessage) {
        const element = document.getElementById(`turn-${lastUserMessage.id}`);
        if (element) {
          viewport.current.scrollTo({
            top: element.offsetTop - 16,
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    const timeout = setTimeout(scrollToLastUserMessage, 100);
    return () => clearTimeout(timeout);
  }, [messages, status]);

  return (
    <>
      <AppShell.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        px="lg"
        ta="center"
      >
        <Toggle type="mobile" />
        <Text fz={{ base: "1rem", xs: "xl" }} fw="900" truncate c="dimmed">
          {chat?.title}
        </Text>
      </AppShell.Header>

      <Flex h="100%" w="100%" direction="column" style={{ overflow: "hidden" }}>
        <ScrollArea
          scrollbars="y"
          w="100%"
          h="100%"
          flex={1}
          viewportRef={viewport}
          type="never"
        >
          <Container size="sm" pt="xl" pb="md" mih="100%" h={0}>
            <Stack gap={"2rem"} w="100%" mih="100%" justify="flex-end">
              <Box style={{ flex: 1 }} />
              {chatTurns?.map((item, idx) => {
                return (
                  <Box
                    pt="xl"
                    id={`turn-${item.user.id}`}
                    key={item.user.id}
                    mih={
                      idx === chatTurns.length - 1
                        ? viewport.current?.clientHeight
                        : "auto"
                    }
                  >
                    <ChatMessage message={item.user} />
                    <Box h={32} />
                    {item.assistant && (
                      <ChatMessage
                        message={item.assistant}
                        id={`msg-${item.assistant.id}`}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Container>
        </ScrollArea>

        <Box pb="xl" pt="xs">
          <Container size="sm">
            <form onSubmit={form.onSubmit(handleProcessForm)}>
              <Chatbox
                {...form.getInputProps("message")}
                disabled={status !== "ready" || !form.values.message.trim()}
                onSubmit={() => handleProcessForm(form.values)}
              />
            </form>
          </Container>
        </Box>
      </Flex>
    </>
  );
}
