"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function getCallbackUrl() {
  const params = new URLSearchParams(window.location.search);
  const callbackUrl = params.get("callbackUrl");
  return callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
    ? callbackUrl
    : "/";
}

export default function SignUpPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState< "google" | "github" | null >(null);
  const isBusy = isLoading || socialLoading !== null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };
    try {
      const { error } = await authClient.signUp.email({
        ...user,
        callbackURL: getCallbackUrl(),
      });
      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }
      toast.success("আপনার অ্যাকাউন্ট তৈরি হয়েছে!");
      router.replace(getCallbackUrl());
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignUp(provider: "google" | "github") {
    setSocialLoading(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getCallbackUrl(),
      });
      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
        setSocialLoading(null);
      }
    } catch {
      toast.error("সংযোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  }

  const inputClassName =
    "h-12 w-full rounded-lg border border-[#DCD6C9] bg-[#FBF9F4] px-4 text-sm text-[#20221E] outline-none transition-colors duration-200 placeholder:text-[#969187] hover:border-[#B8B09F] focus:border-[#42634A] focus:ring-4 focus:ring-[#42634A]/10 disabled:cursor-not-allowed disabled:opacity-60";
  const socialButtonClassName =
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#DCD6C9] bg-[#FBF9F4] text-sm font-medium text-[#20221E] transition-colors hover:bg-[#EDE8DE] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";
  const submitButtonClassName =
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#20221E] px-4 text-sm font-semibold text-[#FBF9F4] transition-colors duration-200 hover:bg-[#42634A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="container mx-auto mb-8 flex justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4] p-6 sm:p-8">
        {/* Heading */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#20221E]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs leading-6 text-[#68675F]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Email Sign Up */}
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="mt-4 space-y-4"
        >
          <div className="space-y-1">
            <label
              htmlFor="signup-name"
              className="block text-xs font-medium text-[#20221E]"
            >
              নাম
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              disabled={isBusy}
              className={inputClassName}
              placeholder="আপনার নাম লিখুন"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="signup-email"
              className="block text-xs font-medium text-[#20221E]"
            >
              ইমেইল
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isBusy}
              className={inputClassName}
              placeholder="আপনার ইমেইল লিখুন"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="signup-password"
              className="block text-xs font-medium text-[#20221E]"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={isBusy}
              className={inputClassName}
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
          </div>
          <button
            type="submit"
            disabled={isBusy}
            className={`${submitButtonClassName} mt-4`}
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-[#DCD6C9]" />
          <span className="text-xs font-medium text-[#868277]">অথবা</span>
          <div className="h-px flex-1 bg-[#DCD6C9]" />
        </div>

        {/* Social Sign Up */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignUp("google")}
            className={socialButtonClassName}
          >
            {socialLoading === "google" ? "সংযোগ করা হচ্ছে..." : "Google"}
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignUp("github")}
            className={socialButtonClassName}
          >
            {socialLoading === "github" ? "সংযোগ করা হচ্ছে..." : "GitHub"}
          </button>
        </div>

        {/* Sign In Link */}
        <p className="mt-8 text-center text-xs text-[#68675F]">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#20221E] underline-offset-4 transition-colors hover:text-[#42634A] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
