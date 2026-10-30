import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPrice, getUnitBn } from "@/lib/utils";
import { ProductInterface } from "@/types/interface";

interface ProductOverviewProps {
  product: ProductInterface;
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  const priceDifference = Math.abs(product.today - product.yesterday);
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
    <section className="overflow-hidden rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4]">
      <div className="flex gap-12 p-4 flex-row justify-between sm:p-6">
        <div className="flex flex-col min-w-0 gap-2">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4F0E7] text-3xl sm:h-16 sm:w-16 sm:rounded-2xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex min-w-0 flex-col">
            <h1 className="text-xl font-bold tracking-tight text-[#20221E] sm:text-2xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              {getUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              {isFlat
                ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
                : `গতকালের তুলনায় আজ দাম ${isUp ? "বেড়েছে" : "কমেছে"}`}
              {` ${formatPrice(priceDifference)} টাকা`}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between rounded-xl bg-[#F4F0E7] p-4 min-w-32 sm:min-w-40 flex-col sm:rounded-2xl sm:p-6">
          <div className="text-center">
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              আজকের দাম
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-[#20221E] sm:text-3xl">
              ৳{formatPrice(product.today)}
            </p>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              {getUnitBn(product.unit)}
            </p>
          </div>
          <div
            className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 ${changeBg} ${changeColor}`}
          >
            <DirectionIcon size={14} strokeWidth={2.2} />
            <span className="text-sm font-semibold">
              {isFlat ? "০%" : `${formatPrice(product.change.pct)}%`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
