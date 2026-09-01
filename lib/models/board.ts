import mongoose, { Schema, Document } from "mongoose";
import { Board } from "./models.types";

const BoardSchema = new Schema<Board>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board ||
  mongoose.model<Board>("Board", BoardSchema);
