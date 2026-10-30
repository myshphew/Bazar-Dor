export default function ProductsSkeleton() {
  return (
    <section
      className="container mx-auto py-12 text-[#20221E]"
      aria-busy="true"
      aria-label="Loading products"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#DCD6C9] pb-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-[#EAE5DA]" />
          <div className="h-6 w-28 animate-pulse rounded bg-[#EAE5DA]" />
        </div>
        <div className="h-4 w-16 animate-pulse rounded bg-[#EAE5DA]" />
      </div>

      {/* Product Skeletons */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-[#EAE5DA]"
          />
        ))}
      </div>
    </section>
  );
}
