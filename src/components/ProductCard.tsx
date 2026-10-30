import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { ProductInterface } from "@/types/interface";
import { formatPrice, getUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductInterface;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const DirectionIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  const changeColor = isUp
    ? "text-[#A54538]"
    : isDown
      ? "text-[#42634A]"
      : "text-[#68675F]";
  const changeBg = isUp
    ? "bg-[#F2E3DE]"
    : isDown
      ? "bg-[#E4EBDD]"
      : "bg-[#F0EDE5]";

  return (
    <Link
      href={`/${encodeURIComponent(product.category)}/${encodeURIComponent(product.slug)}`}
      className="flex justify-between group rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4] transition-colors duration-200 hover:border-[#B8B09F] p-4 sm:p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4F0E7] text-3xl sm:h-16 sm:w-16 sm:rounded-2xl">
          {product.image || product.categoryIcon}
        </div>
        <div className="w-full flex-1">
          <h1 className="text-base font-semibold tracking-tight text-[#20221E]">
            {product.nameBn}
          </h1>
          <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
            {getUnitBn(product.unit)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">আজকের দাম</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-[#20221E] sm:text-3xl">
          ৳{formatPrice(product.today)}
        </p>
        <div
          className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 ${changeBg} ${changeColor}`}
        >
          <DirectionIcon size={14} strokeWidth={2.2} />
          <span className="text-sm font-semibold">
            {isFlat ? "০%" : `${formatPrice(product.change.pct)}%`}
          </span>
        </div>
      </div>
    </Link>
  );
}
