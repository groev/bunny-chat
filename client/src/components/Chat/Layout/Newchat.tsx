import { ActionIcon, Button } from "@mantine/core";
import { useChatLayoutStore } from "./store";
import { Link } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";

export default function Newchat() {
  const opened = useChatLayoutStore((state) => state.opened);

  if (!opened) {
    return (
      <ActionIcon variant="subtle" color="dark" component={Link} to="/">
        <IconEdit />
      </ActionIcon>
    );
  }
  return (
    <Button
      to="/"
      pl="md"
      component={Link}
      variant="subtle"
      color="dark"
      leftSection={<IconEdit size="20" />}
      justify="flex-start"
    >
      Neuer Chat
    </Button>
  );
}
