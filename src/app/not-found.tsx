import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center text-[#68675F]">
          <SearchX size={30} strokeWidth={1.5} />
        </div>
        <p className="text-sm font-semibold tracking-[0.2em] text-[#42634A]">
          ERROR 404
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#20221E] sm:text-3xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#68675F]">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি আর উপলভ্য নেই।
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#20221E] px-5 text-sm font-semibold text-[#FBF9F4] transition-colors hover:bg-[#42634A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20 active:scale-[0.99]"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
        <div className="mt-10 border-t border-[#DCD6C9] pt-5">
          <p className="text-xs text-[#868277]">
            বাজার দর — আপনার নিত্যদিনের বাজারের সঙ্গী।
          </p>
        </div>
      </div>
    </main>
  );
}
