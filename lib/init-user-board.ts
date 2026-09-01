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

    // 1. فحص هل الـ Board موجود وفيها columns بالفعل
    let board = await Board.findOne({
      userId,
      name: { $regex: /^job hunt$/i },
    }).populate("columns");

    // لو الـ Board موجود وجواه columns جاهزة، ارجع بيه فوراً
    if (board && board.columns && board.columns.length > 0) {
      return board;
    }

    // 2. لو الـ Board مش موجود خالص، أنشئه
    if (!board) {
      board = await Board.create({
        name: "job hunt",
        userId,
        columns: [],
      });
    }

    // 3. إنشاء الأعمدة الافتراضية
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

    // 4. ✅ تصحيح اسم الحقل ليكون columns (جمع)
    board.columns = createdColumns.map((col) => col._id);
    await board.save();

    // 5. إرجاع الـ Board بعد الـ Populate لتصل البيانات كاملة
    const populatedBoard = await Board.findById(board._id).populate("columns");
    return populatedBoard;
  } catch (err) {
    console.error("Error initializing board:", err);
    throw err;
  }
}
