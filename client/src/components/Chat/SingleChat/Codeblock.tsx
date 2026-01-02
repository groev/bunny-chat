import { ActionIcon, CopyButton, ScrollArea } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { memo } from "react";

type Props = {
  value: string;
  language: string;
};

export default memo(function Codeblock({ value, language }: Props) {
  return (
    <ScrollArea
      bdrs="md"
      pos="relative"
      type="never"
      py="xl"
      my="xl"
      bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))"
    >
      <CopyButton value={value}>
        {({ copied, copy }) => (
          <ActionIcon
            onClick={copy}
            size="xs"
            pos="absolute"
            right={"0.5rem"}
            top={"0.5rem"}
            color="dark"
            variant="subtle"
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        )}
      </CopyButton>

      <SyntaxHighlighter
        customStyle={{
          backgroundColor: "transparent",
          margin: 0,
          maxWidth: "100%",
        }}
        language={language}
        style={coy}
      >
        {value}
      </SyntaxHighlighter>
    </ScrollArea>
  );
});
