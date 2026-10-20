"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PriceRisers from "@/components/filtered-products/PriceRisers";
import PriceFallers from "@/components/filtered-products/PriceFallers";
import AllProducts from "@/components/filtered-products/AllProducts";
import { ProductInterface } from "@/types/interface";

export default function Home() {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://api-store-indol.vercel.app/api/bazardor/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductInterface[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
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
    <div>
      <Hero />
      <PriceRisers products={risers} />
      <PriceFallers products={fallers} />
      <AllProducts products={products} />
    </div>
  );
}
