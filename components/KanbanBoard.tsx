"use client";
import {
  ClientBoard,
  ClientColumn,
  ClientJobApplication,
} from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./CreateJobApplicationDialog";
import JobApplicationCard from "./JobApplicationCard";
import { useBoard } from "@/lib/hooks/useBoards";

interface KanbanBoardProps {
  board: ClientBoard;
  userId: string;
}
interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

interface DraggableColumnProps {
  column: ClientColumn;
  config: ColConfig;
  boardId: string;
  sortedColumns: ClientColumn[];
}

function DraggableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: DraggableColumnProps) {
  const sortedJobs =
    column.jobApplications?.sort((a, b) => a?.order - b?.order) || [];

  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20 cursor-pointer hover:text-white!"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-zinc-700 cursor-pointer hover:bg-red-100! hover:text-red-700!">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 py-4 bg-gray-50/50 min-h-[400px] rounded-b-lg ">
        {sortedJobs.map((job, key) => (
          <SortableJobCard
            key={key}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={sortedColumns}
          />
        ))}

        <CreateJobApplicationDialog
          columnId={column._id.toString()}
          boardId={boardId}
        />
      </CardContent>
    </Card>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: ClientJobApplication;
  columns: ClientColumn[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const { columns, moveJob } = useBoard(board);

  const sortedColumns = columns?.sort((a, b) => a?.order - b?.order) || [];

  return (
    <div className="">
      <div>
        {columns?.map((col, i) => {
          const columnData = col as unknown as ClientColumn;

          const config = COLUMN_CONFIG[i] || {
            color: "bg-gray-500",
            icon: <Calendar className="h-4 w-4" />,
          };

          return (
            <DraggableColumn
              key={i}
              column={columnData}
              config={config}
              boardId={board._id.toString()}
              sortedColumns={sortedColumns}
            />
          );
        })}
      </div>
    </div>
  );
}
