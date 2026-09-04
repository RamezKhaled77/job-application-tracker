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
import { signIn } from "@/lib/auth/auth-client";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

function SignIn() {
  //SECTION - Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //SECTION - State handling
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message ?? "Failed to sign in");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1 text-center pt-3">
          <CardTitle className="text-2xl font-bold text-black">
            Log In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Log in to access your account
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                className="border-gray-300 h-9 focus:border-primary focus:ring-primary"
                type="email"
                id="email"
                placeholder="ahmed-ali@exmaple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 cursor-pointer h-10"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" /> Logging in...
                </>
              ) : (
                "Log in"
              )}
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignIn />
    </Suspense>
  );
}
