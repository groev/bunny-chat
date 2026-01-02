import { Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { signIn } from "@/util/auth";

export default function Github() {
  return (
    <Button
      color="black"
      variant="filled"
      leftSection={<IconBrandGithub />}
      onClick={() =>
        signIn.social({
          callbackURL: window.location.origin,
          provider: "github",
        })
      }
    >
      Login with Github
    </Button>
  );
}
