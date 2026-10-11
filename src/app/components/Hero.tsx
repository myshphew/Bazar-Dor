import Link from "next/link";
import { ArrowDownRight, ArrowRight, TrendingUp } from "lucide-react";
import { getBanglaDate } from "@/app/lib/utils";

export default function Hero() {
  return (
    <section className="container mx-auto relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:p-10">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-neutral-200"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-neutral-200"
      />

      <div className="relative z-10 max-w-3xl">
        {/* Date Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
          <p className="text-xs font-medium text-neutral-600">
            {getBanglaDate()}
          </p>
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl sm:leading-tight lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* CTA */}
        <Link
          href="#all-products"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          সব পণ্য দেখুন
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Decorative Market Indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 right-8 hidden items-center gap-3 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-sm md:flex"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <TrendingUp size={20} className="text-neutral-700" />
        </div>

        <div>
          <p className="text-xs text-neutral-500">বাজারদর</p>
          <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-neutral-800">
            <ArrowDownRight size={14} />
            <span>প্রতিদিনের আপডেট</span>
          </div>
        </div>
      </div>
    </section>
  );
}