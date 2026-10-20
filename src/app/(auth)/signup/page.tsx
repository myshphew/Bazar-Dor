"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

import Link from "next/link";

export default function SignUpPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      redirect("/");
    }

    if (error) {
      console.log(error);
    }
  };

  const inputClassName =
    "h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition-colors duration-200 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5";

  const labelClassName = "block text-sm font-medium text-neutral-700";

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <div className="my-6 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs font-medium text-neutral-400">
            ইমেইল দিয়ে সাইন আপ করুন
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={onSubmit} autoComplete="on" className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className={labelClassName}>নাম</label>

            <input
              name="name"
              type="text"
              className={inputClassName}
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className={labelClassName}>ইমেইল</label>
            <input
              name="email"
              type="email"
              className={inputClassName}
              placeholder="you@example.com"
            />
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label className={labelClassName}>পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              className={inputClassName}
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-red-700 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-700/20 active:scale-[0.99]"
          >
            সাইন আপ করুন
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-neutral-900 underline-offset-4 transition-colors hover:text-red-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
