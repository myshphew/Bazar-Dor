import Link from "next/link";
import type { ProductInterface } from "@/app/types/interface";
import { formatPrice } from "@/app/lib/utils";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  const isUp = product.change.dir === "up";

  return (
    <Link
      href={`/${encodeURIComponent(product.category)}/${encodeURIComponent(product.slug)}`}
      className="block rounded-xl border border-neutral-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-400 hover:bg-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
    >
      {/* Product Information */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-3xl">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-neutral-900">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-neutral-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Current Price */}
      <div>
        <p className="text-sm text-neutral-500">আজকের বাজারদর</p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
          ৳{formatPrice(product.today)}
          <span className="ml-1 text-sm font-normal text-neutral-500">
            / {product.unit}
          </span>
        </p>
      </div>

      {/* Price Change */}
      <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-sm text-neutral-500">
          গতকালের তুলনায়
        </span>

        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            isUp ? "text-red-600" : "text-green-600"
          }`}
        >
          <span>{isUp ? "↑" : "↓"}</span>
          {formatPrice(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}