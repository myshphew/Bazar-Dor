"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ArrowDown, ArrowUp } from "lucide-react";

import type { ProductInterface } from "@/types/interface";
import { formatPrice } from "@/lib/utils";

export default function MarqueeBar() {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://api-store-indol.vercel.app/api/bazardor/products",
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: ProductInterface[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    getProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-neutral-200 bg-neutral-100">
      <div className="container mx-auto">
        <Marquee pauseOnHover speed={35} gradient={false}>
          {products.map((product) => (
            <Unit key={product.id} display={product} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function Unit({ display }: { display: ProductInterface }) {
  const isUp = display.change.dir === "up";

  return (
    <Link
      href={`/${encodeURIComponent(display.category)}/${encodeURIComponent(display.slug)}`}
      className="flex items-center gap-2 px-5 py-2.5 text-xs transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900"
      aria-label={`${display.nameBn}: ${formatPrice(display.today)} টাকা প্রতি ${display.unit}`}
    >
      <span className="text-base">{display.image || display.categoryIcon}</span>

      <span className="whitespace-nowrap font-medium text-neutral-700">
        {display.nameBn}
      </span>

      <span className="whitespace-nowrap font-semibold text-neutral-900">
        ৳{formatPrice(display.today)}
        <span className="font-normal text-neutral-500">/{display.unit}</span>
      </span>

      <span
        className={`flex items-center gap-0.5 whitespace-nowrap font-semibold ${
          isUp ? "text-red-600" : "text-green-600"
        }`}
      >
        {isUp ? (
          <ArrowUp size={13} strokeWidth={2} />
        ) : (
          <ArrowDown size={13} strokeWidth={2} />
        )}
        {formatPrice(display.change.pct)}%
      </span>
    </Link>
  );
}
