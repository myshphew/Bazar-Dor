import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { ProductInterface } from "@/app/types/interface";
import PriceTable from "@/app/components/product-details/PriceTable";
import ProductOverview from "@/app/components/product-details/ProductOverview";
import MarketPriceDetails from "@/app/components/product-details/MarketPriceDetails";
import BreadCrumbs from "@/app/components/BreadCrumbs";

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

async function getProduct(
  category: string,
  slug: string,
): Promise<ProductInterface | null> {
  const listResponse = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!listResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: ProductInterface[] = await listResponse.json();

  const match = products.find(
    (item) => item.category === category && item.slug === slug,
  );

  if (!match) return null;

  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${match.id}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product: slug } = await params;

  const product = await getProduct(category, slug);

  if (!product) notFound();

  const markets = product.markets ?? [];

  return (
    <div className="mx-auto min-h-[calc(100vh-110px)] max-w-[1120px] px-4 pb-20 pt-7 sm:px-6 lg:px-0">
      <BreadCrumbs
        items={[
          { label: "বাজার দর", href: "/" },
          {
            label: product.categoryNameBn,
            href: `/${encodeURIComponent(product.category)}`,
          },
          { label: product.nameBn },
        ]}
      />

      {/* Product Overview */}
      <ProductOverview product={product} />

      {/* Market Price Details */}
      <MarketPriceDetails product={product} markets={markets} />

      {/* Price History */}
      <PriceTable product={product} />

      {/* Back Navigation */}
      <div className="mt-5">
        <Link
          href={`/${encodeURIComponent(category)}`}
          className="inline-flex items-center gap-2 text-xs text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft size={15} />
          {product.categoryNameBn}-এর অন্যান্য পণ্য
        </Link>
      </div>
    </div>
  );
}
