"use client";

import { ProductInterface } from "@/app/types/interface";
import ProductCard from "../ProductCard";
import { toBengaliNumber } from "@/app/lib/utils";

interface PriceFallersProps {
  products: ProductInterface[];
}

export default function PriceFallers({ products }: PriceFallersProps) {
  return (
    <section className="container mx-auto py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">আজ দাম কমেছে</h2>
        <span className="text-xs text-neutral-400">
          {toBengaliNumber(products.length)} টি পণ্য
        </span>
      </div>

      {products.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-neutral-500">
          বর্তমানে দাম কমেছে এমন কোনো পণ্য বা শেয়ার নেই।
        </p>
      )}
    </section>
  );
}
