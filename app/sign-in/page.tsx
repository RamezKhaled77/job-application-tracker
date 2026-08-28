"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Log In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Log in to access your account
          </CardDescription>
        </CardHeader>
        <form className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                className="border-gray-300 h-9 focus:border-primary focus:ring-primary"
                type="email"
                id="email"
                placeholder="ahmed-ali@exmaple.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                className="border-gray-300 h-9 focus:border-primary focus:ring-primary"
                type="password"
                id="password"
                minLength={8}
                placeholder="********"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 cursor-pointer h-10"
            >
              Sign in
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                {" "}
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
