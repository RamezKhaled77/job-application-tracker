import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { initializeUserBoard } from "@/lib/init-user-board";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  // NOTE - Guard the dashboard page, if the user is not logged in, redirect to the sign-in page
  if (!session?.user) redirect("/sign-in");

  await connectDB();

  const rawBoard = await initializeUserBoard(session.user.id);
  const plainBoard = JSON.parse(JSON.stringify(rawBoard));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-anta text-zinc-950">
            {plainBoard.name}
          </h1>
          <p className="text-zinc-800">Track your job applications</p>
        </div>
        <KanbanBoard board={plainBoard} userId={session.user.id} />
      </div>
    </div>
  );
}
