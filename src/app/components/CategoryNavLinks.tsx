"use client";

import { useEffect, useState } from "react";
import { CategoryInterface } from "../types/interface";
import Link from "next/link";

export default function CategoryNavLinks() {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://api-store-indol.vercel.app/api/bazardor/categories",
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: CategoryInterface[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    getCategories();
  }, []);

  return (
    <div className="container mx-auto flex items-center justify-center py-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${category.id}`}
          className="flex gap-2 px-6 py-2 text-sm font-semibold leading-4"
        >
          <span>{category.icon}</span>
          <span>{category.nameBn}</span>
        </Link>
      ))}
    </div>
  );
}
