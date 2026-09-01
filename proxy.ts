import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(req: NextRequest) {
  const session = await getSession();

  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const isSignInPage = req.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = req.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
