import { Prisma } from "./prisma";

export type Message = Prisma.Message;

export type MessageForm = Omit<Message, "id" | "createdAt" | "read" | "archived">;

