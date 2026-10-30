import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container relative mx-auto overflow-hidden rounded-2xl border border-[#DCD6C9] bg-[#DCD6C9] p-6 text-[#68675F] sm:p-8">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#B8B09F]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-[#B8B09F]/80"
      />

      <div className="relative z-10 max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-2 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#42634A]" />
          <p className="text-xs font-medium tracking-wide text-[#68675F]">
            দৈনিক বাজার প্রতিবেদন
          </p>
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#20221E] sm:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        {/* Description */}
        <p className="mt-2 mb-8 max-w-2xl text-xs sm:text-sm leading-5 text-[#68675F] sm:leading-8">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* CTA */}
        <Link
          href="#all-products"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#20221E] px-5 py-3 text-sm font-semibold text-[#FBF9F4] transition-colors hover:bg-[#42634A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634A]"
        >
          সব পণ্য দেখুন
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Hero Image */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[55%] md:h-full w-[42%]">
        <Image
          src="/hero-img.svg"
          alt="Fresh market produce"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 42vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
