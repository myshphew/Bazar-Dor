import ProductsSkeleton from "@/components/filtered-products/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <main
      className="container mx-auto p-4"
      aria-busy="true"
      aria-label="Loading category products"
    >
      <div className="h-4 w-36 animate-pulse rounded bg-[#EAE5DA]" />
      <section className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="h-10 w-48 max-w-full animate-pulse rounded bg-[#EAE5DA]" />
          <div className="mt-2 h-4 w-64 max-w-full animate-pulse rounded bg-[#EAE5DA]" />
        </div>
        <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-[#EAE5DA] sm:h-16 sm:w-16 sm:rounded-2xl" />
      </section>
      <ProductsSkeleton />
    </main>
  );
}
