# Job Application Tracker

A modern job application tracking system built with Next.js 16, TypeScript, and MongoDB. Track your job search progress with a drag-and-drop Kanban board, organize applications into custom columns, and manage your search all in one place.

## Overview

**Job Application Tracker** helps you manage your job search systematically. Create custom boards, track applications through stages (Wish List → Applied → Interviewing → Offer → Rejected), and visualize your progress with an interactive Kanban interface.

> **Live Demo**: Track your applications from submission to offer stage with visual progress tracking.

## Tech Stack

| Category | Technologies |
|----------|------------|
| **Framework** | Next.js 16.3.3 (App Router) |
| **Language** | TypeScript 5.6+ |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui, @base-ui/react |
| **Authentication** | better-auth with MongoDB adapter |
| **Drag-and-Drop** | @dnd-kit/core, @dnd-kit/sortable |
| **Animations** | framer-motion |
| **Icons** | lucide-react |
| **Database** | MongoDB with Mongoose |
| **Development** | pnpm, tsx, ESLint |

## Features

### Core Functionality

- **User Authentication** – Secure sign in/sign up with better-auth and MongoDB
- **Kanban Board** – Visual drag-and-drop interface to track application progress
- **Customizable Columns** – Organize applications into stages (default: Wish List, Applied, Interviewing, Offer, Rejected)
- **Job Application Details** – Store company, position, location, salary, description, notes, tags, and application URLs
- **Drag-and-Drop Reordering** – Move applications between columns and reorder within columns
- **Application Search & Filtering** – Tag-based organization for quick filtering

### User Experience

- **Responsive Design** – Works desktop and mobile
- **Loading States** – Skeleton loaders and pending indicators
- **Error Handling** – User-friendly error messages and alerts
- **Confirmations** – Delete confirmation dialogs before permanent removal
- **Real-time Validation** – Form validation on create/edit

### Developer Experience

- **TypeScript** – Full type safety across the stack
- **Seed Data** – Populate sample data for testing with `pnpm seed:jobs`
- **API Routes** – Server actions for all data operations
- **Modular Architecture** – Separation of models, actions, and hooks

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 10.0.0 (recommended)
- **MongoDB** – Either local instance or MongoDB Atlas cloud cluster
- **.env.local** file with `MONGODB_URI` environment variable

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root:

   ```env
   MONGODB_URI=mongodb://localhost:27017/job-tracker
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/job-tracker
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server (`next dev`) |
| `pnpm build` | Build production site (`next build`) |
| `pnpm start` | Start production server (`next start`) |
| `pnpm lint` | Run ESLint |
| `pnpm seed:jobs` | Seed the database with sample job applications |

## Usage

### First-Time Setup

1. **Sign up** for a new account or **log in** with existing credentials
2. **Create your first board** – The system initializes with a "Job Hunt" board containing default columns:
   - Wish List
   - Applied
   - Interviewing
   - Offer
   - Rejected
3. **Add job applications** – Click "Add Job" on any column to create new entries
4. **Track progress** – Drag and drop applications between columns as you advance
5. **Manage details** – Edit application information, add tags, or remove applications

### Adding a New Job Application

1. Navigate to a column board
2. Click the **"Add Job"** button
3. Fill in the required fields: **Company**, **Position**, **Location** (optional)
4. Optional: Add **Salary**, **Job URL**, **Tags** (comma-separated), **Description**, **Notes**
5. Submit to create the application

### Moving Applications Between Columns

- Drag a job card from one column to another
- The application automatically updates its status and position
- Order is maintained within each column

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── KanbanBoard.tsx    # Drag-and-drop board interface
│   ├── JobApplicationCard.tsx  # Individual job card
│   └── UI/               # shadcn/ui components
├── lib/                # Core logic
│   ├── auth/           # Authentication setup
│   ├── db/             # Database connection
│   ├── actions/        # Server actions
│   ├── hooks/          # Custom React hooks
│   └── models/         # Mongoose schemas
├── lib/models/         # Type definitions
└── public/             # Static assets
```

## Data Model

### Board

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Board name (default: "Job Hunt") |
| `userId` | string | Associated user ID |
| `columns` | ObjectId[] | References to columns |

### Column

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Column name |
| `boardId` | ObjectId | Parent board |
| `order` | number | Column order |
| `jobApplications` | ObjectId[] | References to jobs |

### Job Application

| Field | Type | Description |
|-------|------|-------------|
| `company` | string | Company name |
| `position` | string | Job position |
| `location` | string | Job location |
| `status` | string | Current status (applied, interviewing, etc.) |
| `columnId` | ObjectId | Current column |
| `boardId` | ObjectId | Parent board |
| `userId` | string | Owner user |
| `order` | number | Position within column |
| `notes` | string | Additional notes |
| `salary` | string | Salary range |
| `jobUrl` | string | Application URL |
| `tags` | string[] | Keywords/tags |
| `description` | string | Role description |
| `appliedDate` | date | Application date |

## Customization

### Adding Custom Columns

Modify `lib/init-user-board.ts` to add default columns:

```typescript
const DEFAULT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
  { name: "On Hold", order: 5 }, // Add new column
];
```

### Styling

The project uses Tailwind CSS v4 with shadcn/ui components. Customize colors and spacing in `tailwind.config.ts` (if present) or via Tailwind directives in your CSS.

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com/new)
3. Add the `MONGODB_URI` environment variable in Vercel's dashboard
4. Deploy

### Other Platforms

- **Netlify** – Connect repository, set `MONGODB_URI` env var
- **Render** – Add MongoDB service, set environment variable
- **Docker** – Use the provided `Dockerfile` pattern for Next.js with MongoDB

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – App Router, API routes, deployment
- [Tailwind CSS v4 Docs](https://tailwindcss.com) – Utility-first styling
- [better-auth Docs](https://better-auth.com) – Authentication with MongoDB
- [@dnd-kit Docs](://dndkit.com) – Accessible drag-and-drop
- [shadcn/ui Docs](https://ui.shadcn.com) – Re-usable components
- [MongoDB Docs](https://mongodb.com/docs) – Database operations

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**