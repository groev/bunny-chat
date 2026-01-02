import { ActionIcon } from "@mantine/core";
import { useChatLayoutStore } from "./store";
import { IconMenu } from "@tabler/icons-react";

export default function Toggle({ type }: { type?: "mobile" | "desktop" }) {
  const opened = useChatLayoutStore((state) => state.opened);
  const setOpened = useChatLayoutStore((state) => state.setOpened);
  return (
    <ActionIcon
      ml={opened ? "6" : "0"}
      hiddenFrom={type === "mobile" ? "xs" : undefined}
      color="dark"
      variant="subtle"
      onClick={() => setOpened(!opened)}
    >
      <IconMenu />
    </ActionIcon>
  );
}
