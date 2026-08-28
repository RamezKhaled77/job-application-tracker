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
import { signUp } from "@/lib/auth/auth-client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  //SECTION - Form data
  const [name, setName] = useState("");
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
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message ?? "Failed to sign up");
      } else {
        router.push("/dashboard");
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
        <CardHeader className="space-y-1 text-center pt-2">
          <CardTitle className="text-2xl font-bold text-black">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create an account to start tracking your job applications
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
              <Label htmlFor="name" className="text-gray-700">
                Name
              </Label>
              <Input
                className="border-gray-300 h-9 focus:border-primary focus:ring-primary"
                type="text"
                id="name"
                placeholder="Ahmed Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                  <Loader className="animate-spin" /> Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                {" "}
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
