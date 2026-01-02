import { useForm } from "@mantine/form";

import Chatbox from "../Chatbox";
import useCreateChat from "@/hooks/useCreateChat";
import { useNavigate } from "react-router-dom";

type FormValues = {
  message: string;
};

export default function Form() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      message: "",
    },
  });

  const { mutate: createChat } = useCreateChat();

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={form.onSubmit((values) =>
        createChat(values, {
          onSuccess: async (values) => {
            navigate(`/${values.id}`);
          },
        })
      )}
    >
      <Chatbox
        disabled={!form.values.message.trim()}
        {...form.getInputProps("message")}
        onSubmit={() => createChat(form.values)}
      />
    </form>
  );
}
