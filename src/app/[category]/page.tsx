import { ProductInterface } from "@/app/types/interface";
import ProductCard from "../components/ProductCard";
import { toBengaliNumber } from "@/app/lib/utils";
import BreadCrumbs from "../components/BreadCrumbs";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const response = await fetch(
    `https://api-store-indol.vercel.app/api/bazardor/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const products: ProductInterface[] = await response.json();

  const categoryName = products[0]?.categoryNameBn ?? category;

  return (
    <main className="container mx-auto pt-12">
      {/* Category Header */}
      <section>
        <BreadCrumbs
          items={[{ label: "বাজার দর", href: "/" }, { label: categoryName }]}
        />

        <h1 className="text-xl font-bold text-neutral-900">{categoryName}</h1>

        <p className="mt-2 text-sm text-neutral-500">
          এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর দেখুন।
        </p>
      </section>

      {/* Product Header */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">সকল পণ্য</h2>

          <span className="text-xs text-neutral-400">
            {toBengaliNumber(products.length)} টি পণ্য
          </span>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-neutral-500">
            বর্তমানে এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}
