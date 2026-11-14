"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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
import { GoogleIcon, GithubIcon } from "./social-icons";
import { loginSchema, signupSchema } from "@/lib/validations/auth";

type Props = {
  mode: "login" | "signup";
};

// Unique text for signup and login forms
const text = {
  login: {
    title: "Welcome back",
    description: "Log in to keep practicing.",
    button: "Log in",
    switchText: "Don’t have an account?",
    switchLink: "Sign up",
    switchHref: "/signup",
  },
  signup: {
    title: "Create your account",
    description: "Start your first mock interview for free.",
    button: "Create account",
    switchText: "Already have an account?",
    switchLink: "Log in",
    switchHref: "/login",
  },
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const t = text[mode];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = 
      mode === "login" 
      ? loginSchema.safeParse({email, password})
      : signupSchema.safeParse({name, email, password});

    if(!result.success){
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    if (mode === "login") {
      const { error } = await authClient.signIn.email({ 
        email, 
        password 
      });
      if (error) {
        setError(error.message ?? "Something went wrong");
        setLoading(false);
        return;
      }
    } else {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password
      });
      if (error) {
        setError(error.message ?? "Something went wrong");
        setLoading(false);
        return;
      }
    }

    router.replace("/dashboard");
  }

  async function handleSocial(provider: "google" | "github") {
    setError("");
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard"
    });

    if (error) {
      setError(error.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" disabled={loading} onClick={() => handleSocial("google")}>
            <GoogleIcon />
            Google
          </Button>
          <Button variant="outline" disabled={loading} onClick={() => handleSocial("github")}>
            <GithubIcon />
            GitHub
          </Button>
        </div>

        <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          or continue with email
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : t.button}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        {t.switchText}&nbsp;
        <Link href={t.switchHref} className="font-medium text-primary hover:underline">
          {t.switchLink}
        </Link>
      </CardFooter>
    </Card>
  );
}
