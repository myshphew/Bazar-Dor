import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

import type { ProductInterface } from "@/app/types/interface";
import { formatPrice } from "@/app/lib/utils";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const DirectionIcon = isUp
    ? ArrowUpRight
    : isDown
      ? ArrowDownRight
      : Minus;

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-neutral-500";

  const changeBg = isUp
    ? "bg-red-50"
    : isDown
      ? "bg-green-50"
      : "bg-neutral-100";

  return (
    <Link
      href={`/${encodeURIComponent(product.category)}/${encodeURIComponent(product.slug)}`}
      className="group block rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-400 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
    >
      {/* Product identity */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-2xl">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-neutral-900">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-neutral-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Price and movement */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-neutral-500">আজকের দাম</p>

          <p className="mt-1 truncate text-2xl font-bold tracking-tight text-neutral-900">
            ৳{formatPrice(product.today)}
          </p>
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 ${changeBg} ${changeColor}`}
        >
          <DirectionIcon size={16} strokeWidth={2.2} />

          <span className="text-sm font-semibold">
            {isFlat ? "০%" : `${formatPrice(product.change.pct)}%`}
          </span>
        </div>
      </div>
    </Link>
  );
}