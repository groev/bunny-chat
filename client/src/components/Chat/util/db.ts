import Dexie, { type EntityTable } from "dexie";
import type { UIMessage } from "@ai-sdk/react";

export interface StoredMessage extends UIMessage {
  chatId: string;
  createdAt: Date;
}

const db = new Dexie("ChatDatabase") as Dexie & {
  chats: EntityTable<{ id: string; name: string; createdAt: Date }, "id">;
  messages: EntityTable<StoredMessage, "id">;
};

db.version(1).stores({
  chats: "id, name, createdAt",
  messages: "id, chatId, createdAt",
});

export { db };
