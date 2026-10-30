"use client";

import { ProductInterface } from "@/types/interface";
import ProductCard from "../ProductCard";
import { toBengaliNumber } from "@/lib/utils";

interface PriceRisersProps {
  products: ProductInterface[];
}

export default function PriceRisers({ products }: PriceRisersProps) {
  return (
    <section className="container mx-auto py-12 text-[#20221E]">
      <div className="flex items-center justify-between gap-3 border-b border-[#DCD6C9] pb-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-[#A54538]" />
          <h2 className="text-xl font-bold tracking-tight">আজ দাম বেড়েছে</h2>
        </div>

        <span className="shrink-0 text-xs text-[#68675F]">
          {toBengaliNumber(products.length)} টি পণ্য
        </span>
      </div>

      {products.length > 0 ? (
        <div className="mt-5 grid grid-cols gap-4 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-[#68675F]">
          বর্তমানে দাম বেড়েছে এমন কোনো পণ্য নেই।
        </p>
      )}
    </section>
  );
}
