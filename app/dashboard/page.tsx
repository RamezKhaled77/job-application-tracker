import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { initializeUserBoard } from "@/lib/init-user-board";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const instant = false;

async function getUserboard(userId: string) {
  "use cache";

  await connectDB();

  const rawBoard = await initializeUserBoard(userId);
  const plainBoard = JSON.parse(JSON.stringify(rawBoard));
  return plainBoard;
}

async function DashboardPage() {
  const session = await getSession();

  // NOTE - Guard the dashboard page, if the user is not logged in, redirect to the sign-in page
  if (!session?.user) redirect("/sign-in");
  const board = await getUserboard(session.user.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-anta text-zinc-950">
            {board.name}
          </h1>
          <p className="text-zinc-800">Track your job applications</p>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <DashboardPage />
    </Suspense>
  );
}
