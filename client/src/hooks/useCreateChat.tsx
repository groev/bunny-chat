import { api } from "@/util/api";
import { useMutation } from "@tanstack/react-query";

type Props = {
  message: string;
};
export default function useCreateChat() {
  return useMutation({
    mutationFn: async (values: Props) => {
      const data = await api.post("/chats", values);
      return data;
    },
  });
}
