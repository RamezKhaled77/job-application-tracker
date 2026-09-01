"use client";
import { Board, Column } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface KanbanBoardProps {
  board: Board;
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
  column: Column;
  config: ColConfig;
  boardId: string;
}

function DraggableColumn({ column, config, boardId }: DraggableColumnProps) {
  return (
    <Card>
      <CardHeader className={`${config.color}`}>
        {config.icon}
        <CardTitle>{column.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;
  console.log("Board Columns:", columns);
  return (
    <div className="">
      <div>
        {columns.map((col, i) => {
          const columnData = col as unknown as Column;

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
            />
          );
        })}
      </div>
    </div>
  );
}
