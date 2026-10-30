import { notFound } from "next/navigation";
import type { CategoryInterface, ProductInterface } from "@/types/interface";
import { toBengaliNumber } from "@/lib/utils";
import BreadCrumbs from "@/components/nav/BreadCrumbs";
import CategoryProductList from "@/components/category/CategoryProductList";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

async function getCategoryData(category: string) {
  const [categoryResponse, productsResponse] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(category)}`,
      { cache: "no-store" },
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${encodeURIComponent(category)}`,
      { cache: "no-store" },
    ),
  ]);

  if (!categoryResponse.ok)
    throw new Error(`Category API failed: ${categoryResponse.status}`);
  if (!productsResponse.ok)
    throw new Error(`Products API failed: ${productsResponse.status}`);

  const categoryData = await categoryResponse.json();
  const productsData = await productsResponse.json();

  console.log("Category response:", categoryData);
  console.log("Products response:", productsData);

  return { categoryData, productsData };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  let productsData: ProductInterface[];
  let categoryData: CategoryInterface;

  try {
    ({ productsData, categoryData } = await getCategoryData(category));
  } catch {
    throw new Error("Unable to load category data. Please try again.");
  }

  const categoryName =
    categoryData.nameBn ?? category ?? productsData[0]?.categoryNameBn;

  if (!productsData.length && !categoryData.nameBn) notFound();

  // Uncomment the below line to check empty state
  // productsData = [];

  return (
    <main className="container mx-auto p-4">
      <BreadCrumbs
        items={[{ label: "বাজার দর", href: "/" }, { label: categoryName }]}
      />
      <section className="flex mt-4 justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#20221E]">
            {categoryName}
          </h1>
          <p className="mt-1 text-sm text-[#68675F]">
            {toBengaliNumber(productsData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl borde border-[DCD6C9] bg-[#EDE8DE] text-3xl sm:h-16 sm:w-16 sm:rounded-2xl">
          {categoryData.icon}
        </div>
      </section>
      <CategoryProductList products={productsData} />
    </main>
  );
}
