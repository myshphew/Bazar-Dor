"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryInterface } from "@/types/interface";

export default function CategoryNavLinks() {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
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
    <div className="container mx-auto overflow-x-auto">
      <div className="flex w-max min-w-full items-center justify-center px-2">
        {categories.map((category) => {
          const href = `/${encodeURIComponent(category.id)}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634A] ${
                isActive
                  ? "border-[#20221E] text-[#20221E]"
                  : "border-transparent text-[#68675F] hover:border-[#B8B09F] hover:bg-[#EDE8DE] hover:text-[#20221E]"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
