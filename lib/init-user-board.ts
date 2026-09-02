import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    let board = await Board.findOne({
      userId,
      name: { $regex: /^job hunt$/i },
    }).populate({
      path: "columns",
      populate: {
        path: "jobApplications",
      },
    });

    if (board && board.columns && board.columns.length > 0) {
      return board;
    }

    if (!board) {
      board = await Board.create({
        name: "job hunt",
        userId,
        columns: [],
      });
    }

    const createdColumns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );

    board.columns = createdColumns.map((col) => col._id);
    await board.save();

    const populatedBoard = await Board.findById(board._id).populate({
      path: "columns",
      populate: {
        path: "jobApplications",
      },
    });
    return populatedBoard;
  } catch (err) {
    console.error("Error initializing board:", err);
    throw err;
  }
}
