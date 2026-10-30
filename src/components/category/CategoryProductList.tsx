"use client";

import { useState } from "react";
import type { ProductInterface } from "@/types/interface";
import { toBengaliNumber } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/category/SortDropdown";

interface ProductListProps {
  products: ProductInterface[];
}

export default function CategoryProductList({ products }: ProductListProps) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  return (
    <section className="container mx-auto mt-8 text-[#20221E]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCD6C9] pb-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-[#68675F]" />
          <h2 className="text-xl font-bold tracking-tight">সকল পণ্য</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="shrink-0 text-sm text-[#68675F]">
            {toBengaliNumber(products.length)} টি পণ্য
          </span>
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-sm text-[#68675F]">
          বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
