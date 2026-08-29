import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/auth/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutBtn from "./sign-out-btn";

export const dynamic = "force-dynamic";

export default async function Navbar() {
  const session = await getSession();

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
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "ghost",
                  className: "text-zinc-700 hover:text-zinc-900 cursor-pointer",
                })}
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white ">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <SignOutBtn />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-zinc-500 h-10 hover:text-zinc-700 text-md font-medium px-4 cursor-pointer",
                })}
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-zinc-100 bg-primary hover:bg-primary/85 px-6 h-10 text-md cursor-pointer font-medium hover:text-zinc-100",
                })}
              >
                Start for free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
