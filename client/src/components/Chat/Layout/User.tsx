import { Avatar, Box, Group, Menu } from "@mantine/core";
import { useSession } from "@/util/auth";
import { signOut } from "@/util/auth";

export default function User() {
  const { data } = useSession();
  return (
    <Menu>
      <Menu.Target>
        <Group style={{ cursor: "pointer" }}>
          <Avatar>{data?.user?.name?.[0]}</Avatar>
          <Box>
            <Box>{data?.user?.name}</Box>
            <Box fz="xs">{data?.user?.email}</Box>
          </Box>
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => signOut()}>Sign out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
