import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-300 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-zinc-500 h-10 hover:text-zinc-700 text-md font-medium px-4 cursor-pointer"
            >
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-zinc-100 bg-primary hover:bg-primary/85 px-6 h-10 text-md cursor-pointer font-medium">
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
