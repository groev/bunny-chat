import { AppShell, Box, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Toggle from "./Toggle";
import { useChatLayoutStore } from "./store";
import Newchat from "./Newchat";
import { Sidebar } from "./Sidebar";

import User from "./User";

export default function Layout() {
  const opened = useChatLayoutStore((state) => state.opened);
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: opened ? 300 : 60,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        hiddenFrom="xs"
        style={{ display: "flex", alignItems: "center" }}
        px="lg"
      >
        <Toggle type="mobile" />
      </AppShell.Header>
      <AppShell.Navbar
        style={{
          alignItems: opened ? "flex-start" : "center",
          justifyContent: "space-between",
        }}
        p="xs"
      >
        <Stack>
          <Box>
            <Toggle />
          </Box>
          <Newchat />
          {opened && <Sidebar />}
        </Stack>
        <User />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          height: "calc(100vh - var(--app-shell-header-offset))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
