"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function SignOutBtn() {
  return (
    <DropdownMenuItem
      className="cursor-pointer mt-1 hover:bg-red-100! hover:text-red-700!"
      onClick={async () => {
        const res = await signOut();
        if (res.data?.success) {
          window.location.href = "/sign-in";
        } else {
          alert("Error signing out");
        }
      }}
    >
      <LogOut />
      Log Out
    </DropdownMenuItem>
  );
}
