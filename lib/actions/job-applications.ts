"use server";

import connectDB from "@/lib/db";
import JobApplication from "@/lib/models/job-application";
import Column from "@/lib/models/column";
import { getSession } from "@/lib/auth/auth";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { Board } from "../models";

export type FormState = {
  error?: string;
  success?: boolean;
};

export async function createJobApplication(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectDB();

    // * Get the current user session to ensure the user is authenticated
    const session = await getSession();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const columnId = formData.get("columnId") as string;
    const boardId = formData.get("boardId") as string;

    //*  Verify board ownership
    const board = await Board.findOne({
      _id: boardId,
      userId: session.user.id,
    });

    if (!board) {
      return {
        error: "Board not found .",
      };
    }

    //* Verify column belogns to board
    const column = await Column.findOne({
      _id: columnId,
      boardId: boardId,
    });

    if (!column) {
      return {
        error: "Column not found .",
      };
    }

    //* Validate required fields
    if (!columnId || !boardId || !company || !position) {
      return { error: "Missing required fields" };
    }

    const location = (formData.get("location") as string) || "";
    const salary = (formData.get("salary") as string) || "";
    const jobUrl = (formData.get("jobUrl") as string) || "";
    const description = (formData.get("description") as string) || "";
    const notes = (formData.get("notes") as string) || "";
    const tagsString = formData.get("tags") as string;

    const tags = tagsString
      ? tagsString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const maxOrder = (await JobApplication.findOne({ columnId })
      .sort({
        order: -1,
      })
      .select("order")
      .lean()) as { order: number } | null;

    const newJob = await JobApplication.create({
      company,
      position,
      location,
      salary,
      jobUrl,
      description,
      notes,
      tags,
      userId: session.user.id,
      boardId: new mongoose.Types.ObjectId(boardId),
      columnId: new mongoose.Types.ObjectId(columnId),
      status: "applied",
      order: maxOrder ? maxOrder.order + 1 : 0,
    });

    await Column.findByIdAndUpdate(columnId, {
      $push: { jobApplications: newJob._id },
    });

    revalidatePath("/dashboard");
    return { success: true, error: undefined };
  } catch (err: unknown) {
    console.error("Error creating job application:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
    return { error: message };
  }
}

export async function updateJobApplication(
  id: string,
  updates: {
    company?: string;
    position?: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  },
) {
  const session = await getSession();

  if (!session?.user) return { error: "Unauthorized" };

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) return { error: "Job application not found" };

  if (jobApplication.userId !== session.user.id)
    return { error: "Unauthorized" };

  const { columnId, order, ...otherUpdates } = updates;

  const updatesToApply: Partial<{
    company: string;
    position: string;
    location: string;
    notes: string;
    salary: string;
    jobUrl: string;
    columnId: string;
    order: number;
    tags: string[];
    description: string;
  }> = otherUpdates;

  const currColumnId = jobApplication.columnId.toString();
  const newColumnId = columnId?.toString();
  const isMovingToDiffCol = newColumnId && newColumnId !== currColumnId;

  if (isMovingToDiffCol) {
    await Column.findByIdAndUpdate(currColumnId, {
      $pull: { jobApplications: id },
    });

    const jobsInTargetColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: id },
    })
      .sort({ order: -1 })
      .lean();

    let newOrderValue: number;

    if (order !== undefined && order !== null) {
      newOrderValue = order * 100;
      const jobsThatNeedToShift = jobsInTargetColumn.slice(order);
      for (const job of jobsThatNeedToShift) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else {
      if (jobsInTargetColumn.length > 0) {
        const lastJobOrder =
          jobsInTargetColumn[jobsInTargetColumn.length - 1].order || 0;
        newOrderValue = lastJobOrder + 100;
      } else {
        newOrderValue = 0;
      }
    }

    updatesToApply.columnId = newColumnId;
    updatesToApply.order = newOrderValue;

    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: id },
    });
  } else if (order !== undefined && order !== null) {
    const otherJobsInColumn = await JobApplication.find({
      columnId: currColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const currentJobOrder = jobApplication.order || 0;
    const currentPositionIndex = otherJobsInColumn.findIndex(
      (job) => job.order > currentJobOrder,
    );

    const oldPositionIndex =
      currentPositionIndex === -1
        ? otherJobsInColumn.length
        : currentPositionIndex;
    const newOrderValue = order * 100;

    if (order < oldPositionIndex) {
      const jobsToShiftDown = otherJobsInColumn.slice(order, oldPositionIndex);

      for (const job of jobsToShiftDown) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else if (order > oldPositionIndex) {
      const jobsToShiftUp = otherJobsInColumn.slice(oldPositionIndex, order);
      for (const job of jobsToShiftUp) {
        const newOrder = Math.max(0, job.order - 100);
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: newOrder },
        });
      }
    }

    updatesToApply.order = newOrderValue;
  }

  const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
    new: true,
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(updated)) };
}
