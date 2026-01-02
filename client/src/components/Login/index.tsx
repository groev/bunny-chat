import { Center, Divider, Stack, Title } from "@mantine/core";
import Email from "./Email";
import Github from "./Github";
import { useSession } from "@/util/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { data } = useSession();
  if (data) return <Navigate to="/" />;
  return (
    <Center mih="100dvh">
      <Stack>
        <Title>Welcome to Bunny Chat</Title>
        <Email />
        <Divider label="or" />
        <Github />
      </Stack>
    </Center>
  );
}
