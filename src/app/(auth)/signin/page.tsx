"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function getCallbackUrl() {
  const params = new URLSearchParams(window.location.search);
  const callbackUrl = params.get("callbackUrl");

  // Only allow relative paths on this website.
  return callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
    ? callbackUrl
    : "/";
}

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Unable to sign in.");
        return;
      }

      router.push(getCallbackUrl());
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getCallbackUrl(),
      });

      if (error) {
        setError(error.message || "Unable to sign in.");
        setLoading(false);
      }
    } catch {
      setError("Unable to connect. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="mb-8 flex w-fit items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-xl font-bold text-white">
            ব
          </span>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            বাজার দর
          </span>
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Sign in to continue to your account.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialSignIn("google")}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-medium transition hover:bg-neutral-50 disabled:opacity-50"
          >
            <span className="font-bold">G</span>
            Google
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialSignIn("github")}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-medium transition hover:bg-neutral-50 disabled:opacity-50"
          >
            GitHub
          </button>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">
            OR CONTINUE WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-neutral-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-neutral-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
