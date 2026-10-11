"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { ProductInterface } from "@/app/types/interface";
import { ArrowDown, ArrowUp } from "lucide-react";

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
    <div className="container mx-auto">
      <Marquee>
        {products.map((product) => (
          <div key={product.id}>
            <Unit display={product} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

function Unit({ display }: { display: ProductInterface }) {
  const isUp = display.change.dir === "up";

  return (
    <div className="flex gap-2 px-6 py-2 text-sm font-semibold leading-4">
      <p>{display.image}</p>
      <p>{display.nameBn}</p>
      <p>{`${display.today}/${display.unit}`}</p>

      <span
        className={`flex gap-1 ${isUp ? "text-green-500" : "text-red-500"}`}
      >
        {isUp ? (
          <ArrowUp size={16} strokeWidth={1.5} />
        ) : (
          <ArrowDown size={16} strokeWidth={1.5} />
        )}

        <p>{display.change.pct}</p>
      </span>
    </div>
  );
}
