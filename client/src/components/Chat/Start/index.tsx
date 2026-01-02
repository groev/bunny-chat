import { AppShell, Container, Text, Title } from "@mantine/core";
import Form from "./Form";
import Examples from "./Examples";

export default function Start() {
  return (
    <>
      <AppShell.Header
        px="lg"
        flex={1}
        style={{ alignItems: "center", display: "flex" }}
      >
        <Title order={1} ta="center" fz="xl" fw={700} c="dimmed">
          Bunny Chat
        </Title>
      </AppShell.Header>
      <Container w="100%" size="sm" pt="40dvh">
        <Title mb="lg">
          Hello there!
          <br />
          <Text inherit span c="dimmed">
            Type your first message.
          </Text>
        </Title>
        <Form />
        <Examples />
      </Container>
    </>
  );
}
