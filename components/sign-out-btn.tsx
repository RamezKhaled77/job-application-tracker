"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function SignOutBtn() {
  return (
    <DropdownMenuItem
      className="cursor-pointer hover:bg-red-100 hover:text-red-700"
      onClick={async () => {
        const res = await signOut();
        if (res.data?.success) {
          window.location.href = "/sign-in";
        } else {
          alert("Error signing out");
        }
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
}
