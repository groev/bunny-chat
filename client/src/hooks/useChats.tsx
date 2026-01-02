import type { GetApiChats200Item } from "@/gen/types";
import { api } from "@/util/api";
import { useQuery } from "@tanstack/react-query";

export default function useCreateChat() {
  return useQuery<GetApiChats200Item[]>({
    queryKey: ["chats"],
    queryFn: async () => await api.get("/chats"),
  });
}
