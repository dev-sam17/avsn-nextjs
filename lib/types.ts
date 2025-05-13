import { Prisma } from "./prisma";

export type Message = Prisma.Message;
export type MessageForm = Omit<Message, "id" | "createdAt" | "read" | "archived">;

export type Activity = Prisma.Activity
export type ActivityForm = Omit<Activity, "id" | "url">

export type Notice = Prisma.Notice;
export type NoticeFormBody = Omit<Notice, "id" | "createdAt">;

export interface Image {
    public_id: string
    secure_url: string
    format: string
    width: number
    height: number
}