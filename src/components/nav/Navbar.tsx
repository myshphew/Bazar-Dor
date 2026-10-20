"use client";

import Link from "next/link";
import { UserRound, LogOut } from "lucide-react";

import CategoryNavLinks from "./CategoryNavLinks";
import MarqueeBar from "./MarqueeBar";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-neutral-50">
      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link
          href="/"
          aria-label="বাজার দর - হোম"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-xl font-bold text-white">
            ব
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-neutral-900">
              বাজার দর
            </h1>
          </div>
        </Link>

        {/* Authentication Actions */}
        <div className="flex items-center gap-2">
          {!isPending &&
            (session ? (
              <>
                <Link
                  href="/my-profile"
                  className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                  <UserRound size={16} />
                  <span>{session.user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                  <LogOut size={16} />
                  <span>লগ আউট</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                  <UserRound size={16} />
                  <span>সাইন ইন</span>
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                >
                  সাইন আপ
                </Link>
              </>
            ))}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-neutral-200">
        <CategoryNavLinks />
      </div>

      {/* Market Updates */}
      <MarqueeBar />
    </nav>
  );
}
