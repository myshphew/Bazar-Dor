import { notFound } from "next/navigation";
import type { ProductInterface } from "@/types/interface";
import BreadCrumbs from "@/components/nav/BreadCrumbs";
import ProductOverview from "@/components/product-details/ProductOverview";
import MarketPriceDetails from "@/components/product-details/MarketPriceDetails";
import PriceHistory from "@/components/product-details/PriceHistory";

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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("API base URL is not configured.");

  const productsResponse = await fetch(`${baseUrl}/products`, {
    next: { revalidate: 3600 },
  });

  if (!productsResponse.ok)
    throw new Error(`Products API failed: ${productsResponse.status}`);

  const productsData: ProductInterface[] = await productsResponse.json();
  const product = productsData.find(
    (item) => item.category === category && item.slug === slug,
  );

  if (!product) return null;

  const detailResponse = await fetch(
    `${baseUrl}/products/${encodeURIComponent(String(product.id))}`,
    { next: { revalidate: 3600 } },
  );

  if (detailResponse.status === 404) return null;

  if (!detailResponse.ok) throw new Error("Failed to fetch product details.");

  return (await detailResponse.json()) as ProductInterface;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product: slug } = await params;
  const product = await getProduct(category, slug);
  if (!product) notFound();
  const markets = product.markets ?? [];

  return (
    <main className="container mx-auto p-4">
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
      <div className="mt-4 mb-10">
        <ProductOverview product={product} />
        <MarketPriceDetails product={product} markets={markets} />
        <PriceHistory product={product} />
      </div>
    </main>
  );
}
