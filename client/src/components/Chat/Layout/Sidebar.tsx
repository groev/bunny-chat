import { ActionIcon, Button, Menu, Stack, Text } from "@mantine/core";
import { db } from "../util/db";
import { NavLink } from "react-router-dom";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useChatLayoutStore } from "./store";
import useChats from "@/hooks/useChats";
import type { GetApiChats200Item } from "@/gen/types";

export function Sidebar() {
  const opened = useChatLayoutStore((state) => state.opened);
  const { data: allChats } = useChats();
  return (
    <Stack gap={4} visibleFrom={!opened ? "xs" : undefined}>
      <Text fw="bold" fz="sm" pl="md">
        Chats
      </Text>
      {allChats
        ?.filter((chat) => chat.title.length > 0)
        .slice(0, 15)
        .map((chat) => (
          <ChatItem chat={chat} />
        ))}
    </Stack>
  );
}

function ChatItem({ chat }: { chat: GetApiChats200Item }) {
  const { hovered, ref } = useHover();

  return (
    <Button
      ref={ref}
      pl="md"
      variant="subtle"
      styles={{
        label: {
          flex: 1,
        },
      }}
      justify="space-between"
      color="dark"
      style={{ overflow: "visible" }}
      rightSection={<DeleteChat id={chat.id} visible={hovered} />}
      key={chat.id}
    >
      <Text
        py="xs"
        component={NavLink}
        to={`/${chat.id}`}
        maw={200}
        flex={1}
        td="none"
        ta="left"
        fw={500}
        fz="sm"
        truncate
        c="dark"
      >
        {chat.title}
      </Text>
    </Button>
  );
}

function DeleteChat({ id, visible }: { id: string; visible: boolean }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Menu
      closeOnClickOutside
      withinPortal={true}
      offset={-10}
      opened={opened}
      onClose={close}
    >
      <Menu.Target>
        <ActionIcon
          onClick={open}
          opacity={visible || opened ? 1 : 0}
          color="dark"
          variant={opened ? "light" : "subtle"}
          size="lg"
          radius="xl"
        >
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          closeMenuOnClick={false}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            db.chats.delete(id);
          }}
          leftSection={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
