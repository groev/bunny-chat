import { ActionIcon, Card, Group, Textarea } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

type Props = {
  disabled?: boolean;
  onSubmit: () => void;
};
export default function Chatbox({ disabled, onSubmit, ...props }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <Card p={0} radius="xl" withBorder>
      <Group wrap="nowrap" px="xl" py="xs" align="flex-end" gap="xs">
        <Textarea
          fz="md"
          autoFocus
          size="md"
          variant="unstyled"
          autosize
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={5}
          style={{ flex: 1 }}
          {...props}
          placeholder="Type anything..."
        />
        <ActionIcon
          type="submit"
          disabled={disabled}
          size="lg"
          radius="xl"
          variant="filled"
          mb={4}
        >
          <IconArrowRight size={20} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
