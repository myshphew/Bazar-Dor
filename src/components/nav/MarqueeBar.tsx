"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, getUnitBn } from "@/lib/utils";
import type { ProductInterface } from "@/types/interface";
import Marquee from "react-fast-marquee";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export default function MarqueeBar() {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
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

  if (products.length === 0) return null;

  return (
    <div className="border-t border-[#DCD6C9] bg-[#F4F0E7]">
      <div className="mx-auto container">
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
  const isDown = display.change.dir === "down";
  const isFlat = display.change.dir === "flat";

  const DirectionIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  const changeColor = isUp
    ? "text-[#A54538]"
    : isDown
      ? "text-[#42634A]"
      : "text-[#68675F]";

  return (
    <Link
      href={`/${encodeURIComponent(display.category)}/${encodeURIComponent(display.slug)}`}
      className="flex items-center gap-2 border-r border-[#DCD6C9]/70 px-5 py-2.5 text-xs transition-colors hover:bg-[#EDE8DE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634A]"
      aria-label={`${display.nameBn}: ${formatPrice(display.today)} টাকা প্রতি ${display.unit}`}
    >
      <span className="text-base">{display.image || display.categoryIcon}</span>

      <span className="whitespace-nowrap font-medium text-[#68675F]">
        {display.nameBn}
      </span>

      <span className="whitespace-nowrap font-semibold text-[#20221E]">
        ৳{formatPrice(display.today)}
        <span className="font-normal text-[#68675F]">
          {getUnitBn(display.unit)}
        </span>
      </span>

      <span
        className={`flex items-center gap-0.5 whitespace-nowrap font-semibold ${changeColor}`}
      >
        <DirectionIcon size={13} strokeWidth={2} />
        {isFlat ? "০%" : `${formatPrice(display.change.pct)}%`}
      </span>
    </Link>
  );
}
