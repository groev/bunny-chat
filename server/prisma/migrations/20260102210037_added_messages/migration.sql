-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chat_userId_idx" ON "chat"("userId");

-- CreateIndex
CREATE INDEX "message_chatId_idx" ON "message"("chatId");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
