import mongoose, { Schema } from "mongoose";
import { Column } from "./models.types";

const ColumnSchema = new Schema<Column>(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Column ||
  mongoose.model<Column>("Column", ColumnSchema);
