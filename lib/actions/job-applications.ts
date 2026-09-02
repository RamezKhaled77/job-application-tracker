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
