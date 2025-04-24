import NoticeManagement from "@/components/notice-management";
import Header from "@/components/header";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const notices = await prisma.notice.findMany();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">
          Notice Management
        </h1>
        <p className="text-slate-600 mb-8">
          Manage, organize, and share important notices with your team
        </p>
        <NoticeManagement notices={notices} />
      </main>
    </div>
  );
}
