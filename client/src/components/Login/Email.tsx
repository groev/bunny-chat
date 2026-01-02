import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "@/util/auth";
import { useMutation } from "@tanstack/react-query";

type FormValues = {
  email: string;
  password: string;
};

export default function Email() {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data, error } = await signIn.email(values);
      if (error) {
        throw new Error(error.message || "Something went wrong");
      }
      return data;
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" loading={isPending}>
          Login with E-Mail
        </Button>
        {error && (
          <Alert color="red" title="Error">
            {error.message}
          </Alert>
        )}
      </Stack>
    </form>
  );
}
