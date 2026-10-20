import { ArrowDown, ArrowUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ProductInterface } from "@/types/interface";

export default function ProductOverview({
  product,
}: {
  product: ProductInterface;
}) {
  const isUp = product.change.dir === "up";
  const priceDifference = Math.abs(product.today - product.yesterday);

  return (
    <section className="flex flex-row items-center justify-between gap-5 rounded-2xl bg-neutral-50 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-4xl">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {product.nameBn}
          </h1>

          <p className="mt-1 text-xs text-neutral-500">
            প্রতি {product.unit} · {product.categoryNameBn}
          </p>

          <p className="mt-2 text-xs leading-5 text-neutral-600">
            গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"} ·{" "}
            {formatPrice(priceDifference)} টাকা
          </p>
        </div>
      </div>

      {/* Current Price */}
      <div className="flex h-fit w-30 flex-col items-center justify-center rounded-2xl bg-neutral-100 p-4">
        <p className="text-xs text-neutral-500">আজকের দাম</p>

        <p className="text-3xl font-bold leading-9 text-neutral-900">
          {formatPrice(product.today)}
        </p>

        <p className="mt-2 text-xs text-neutral-500">টাকা / {product.unit}</p>

        <span
          className={`mt-2 flex items-center gap-1 text-xs font-semibold ${
            isUp ? "text-red-600" : "text-green-600"
          }`}
        >
          {isUp ? (
            <ArrowUp size={13} strokeWidth={2} />
          ) : (
            <ArrowDown size={13} strokeWidth={2} />
          )}
          {formatPrice(product.change.pct)}%
        </span>
      </div>
    </section>
  );
}
