import { create } from "zustand";

interface ChatLayoutState {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export const useChatLayoutStore = create<ChatLayoutState>((set) => ({
  opened: true,
  setOpened: (opened) => set({ opened }),
}));
