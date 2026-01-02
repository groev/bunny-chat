import { Box, Card, Group, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Codeblock from "./Codeblock";
import type { UIMessage } from "@ai-sdk/react";

export function ChatMessage({
  message,
  id,
}: {
  message: UIMessage;
  id?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Transition
      mounted={mounted}
      transition="slide-up"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Group
          id={id}
          style={styles}
          justify={message.role === "user" ? "end" : "start"}
          w="100%"
        >
          {message.role === "user" && (
            <Card
              withBorder={false}
              bg="light-dark(var(--mantine-color-dark-1), var(--mantine-color-dark-6))"
              p="md"
              radius="lg"
              style={{ maxWidth: "85%" }}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <span key={index}>{part.text}</span>
                ) : null
              )}
            </Card>
          )}
          {message.role === "assistant" && (
            <Box style={{ maxWidth: "85%" }}>
              <Markdown
                children={message.parts
                  .map((item) => (item.type === "text" ? item.text : ""))
                  .join("")}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <Codeblock
                        key={node?.position?.start.offset} // markdown nodes usually have position data
                        value={String(children).replace(/\n$/, "")}
                        language={match[1]}
                      />
                    ) : (
                      <code {...props}>{children}</code>
                    );
                  },
                }}
              />
            </Box>
          )}
        </Group>
      )}
    </Transition>
  );
}
