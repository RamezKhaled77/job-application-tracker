"use client";

import { useState } from "react";
import {
  ClientBoard,
  ClientColumn,
  ClientJobApplication,
} from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

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
    newColumnId: string,
    newOrder: number,
  ) {
    setColumns((prev) => {
      if (!prev) return prev;

      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      // Find and remove job from the old column

      let jobToMove: ClientJobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId,
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobApplicationId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error", err);
    }
  }

  return { board, columns, error, moveJob };
}
