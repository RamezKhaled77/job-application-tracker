"use client";

import { useEffect, useRef, useState } from "react";
import { ClientBoard, ClientColumn } from "../models/models.types";

export function useBoard(initBoard?: ClientBoard | null) {
  const [board, setBoard] = useState<ClientBoard | null>(initBoard || null);
  const [columns, setColumns] = useState<ClientColumn[] | null>(
    initBoard?.columns || null,
  );
  const [error, setError] = useState<string | null>(null);

  const [prevInitBoard, setPrevInitBoard] = useState(initBoard);

  if (initBoard !== prevInitBoard) {
    setPrevInitBoard(initBoard);
    if (initBoard) {
      setBoard(initBoard);
      setColumns(initBoard.columns || []);
    }
  }
  async function moveJob(
    jobApplicationId: string,
    newColumnID: string,
    newOrder: number,
  ) {}

  return { board, columns, error, moveJob };
}
