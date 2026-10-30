"use client";

import Link from "next/link";
import { UserRound, TrendingUpDown } from "lucide-react";
import { Suspense } from "react";

import CategoryNavLinks from "./CategoryNavLinks";
import MarqueeBar from "./MarqueeBar";
import { authClient } from "@/lib/auth-client";
import CurrentDate from "./CurrentDate";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#DCD6C9] bg-[#F4F0E7] text-[#20221E]">
      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-3 sm:px-4">
        <Link
          href="/"
          aria-label="বাজার দর - হোম"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#68675F] text-[#DCD6C9] sm:h-11 sm:w-11">
            <TrendingUpDown size={21} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#20221E] sm:text-base">
              বাজার দর
            </h1>
            <Suspense
              fallback={
                <p className="text-[10px] text-[#68675F] sm:text-xs">
                  তারিখ লোড হচ্ছে...
                </p>
              }
            >
              <CurrentDate />
            </Suspense>
          </div>
        </Link>

        {/* Authentication Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {!isPending &&
            (session ? (
              <Link
                href="/my-profile"
                aria-label="আমার প্রোফাইল"
                className="flex h-9 items-center gap-2 rounded-full p-1 transition-colors hover:bg-[#E8E2D7] sm:h-10 sm:pl-2"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    width={24}
                    height={24}
                    className="h-8 w-8 rounded-full border border-[#DCD6C9] object-cover sm:h-9 sm:w-9"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCD6C9] bg-[#E8E2D7] text-[#42634A] sm:h-9 sm:w-9">
                    <UserRound size={17} />
                  </div>
                )}

                <span className="hidden max-w-28 truncate text-xs font-medium sm:block sm:text-sm">
                  {session.user.name?.trim().split(/\s+/)[0]}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-2 text-[11px] font-medium text-[#68675F] transition-colors hover:bg-[#E8E2D7] hover:text-[#20221E] sm:h-9 sm:gap-2 sm:px-3 sm:text-sm"
                >
                  <UserRound size={14} className="sm:size-4" />
                  <span>সাইন ইন</span>
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#20221E] px-2.5 text-[11px] font-medium text-[#FBF9F4] transition-colors hover:bg-[#42634A] sm:h-9 sm:px-4 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            ))}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-[#DCD6C9]">
        <Suspense fallback={<div />}>
          <CategoryNavLinks />
        </Suspense>
      </div>

      {/* Market Updates */}
      <Suspense fallback={<div />}>
        <MarqueeBar />
      </Suspense>
    </nav>
  );
}
