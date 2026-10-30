import type { ProductInterface } from "@/types/interface";
import { formatPrice, getUnitBn } from "@/lib/utils";

interface PriceTableProps {
  product: ProductInterface;
}

export default function PriceTable({ product }: PriceTableProps) {
  const prices = [
    { label: "আজকের দাম", value: product.today },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ];

  return (
    <section className="flex flex-col gap-8">
      <div className="mt-10 flex flex-col gap-3">
        <h2 className="text-base font-bold text-[#20221E]">দামের ইতিহাস</h2>
        <div className="grid grid-cols-3 divide-x divide-[#DCD6C9] rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4]">
          {prices.map((item) => (
            <div key={item.label} className="min-w-0 p-3 sm:p-6">
              <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
                {item.label}
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-[#20221E] sm:text-2xl">
                ৳{formatPrice(item.value)}
              </p>

              <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
                {getUnitBn(product.unit)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
