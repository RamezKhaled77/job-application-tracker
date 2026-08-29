import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  {
    name: "Applied",
    order: 1,
  },
  {
    name: "Interviewing",
    order: 2,
  },
  {
    name: "Offer",
    order: 3,
  },
  {
    name: "Rejected",
    order: 4,
  },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    // check if the board already exists
    const exsitingBoard = await Board.findOne({ userId, name: "job Hunt" });

    if (exsitingBoard) return exsitingBoard;

    // create the board
    const board = await Board.create({
      name: "job hunt",
      userId,
      columns: [],
    });

    // create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplication: [],
        }),
      ),
    );

    // update the board with the new column IDs
    board.column = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}
