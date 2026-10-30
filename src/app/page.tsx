"use client";

import { useEffect, useState } from "react";
import type { ProductInterface } from "@/types/interface";

import Hero from "@/components/Hero";
import PriceRisers from "@/components/filtered-products/PriceRisers";
import PriceFallers from "@/components/filtered-products/PriceFallers";
import AllProducts from "@/components/filtered-products/AllProducts";
import ProductsSkeleton from "@/components/filtered-products/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductInterface[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  // Top 6 price risers
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 price fallers
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F4F0E7] p-4 text-[#20221E]">
      <Hero />
      {isLoading ? (
        <>
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
        </>
      ) : (
        <>
          <PriceRisers products={risers} />
          <PriceFallers products={fallers} />
          <AllProducts products={products} />
        </>
      )}
    </div>
  );
}
