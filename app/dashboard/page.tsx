import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { Kanban } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  // NOTE - Guard the dashboard page, if the user is not logged in, redirect to the sign-in page
  if (!session?.user) redirect("/sign-in");

  await connectDB();

  const board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  });

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
