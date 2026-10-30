export default function ProductLoading() {
  return (
    <main
      className="container mx-auto p-4"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-4 w-20 animate-pulse rounded bg-[#EAE5DA]" />
        <div className="h-3 w-3 animate-pulse rounded bg-[#EAE5DA]" />
        <div className="h-4 w-24 animate-pulse rounded bg-[#EAE5DA]" />
        <div className="h-3 w-3 animate-pulse rounded bg-[#EAE5DA]" />
        <div className="h-4 w-32 animate-pulse rounded bg-[#EAE5DA]" />
      </div>
      <div className="mt-4 mb-10 space-y-8">
        <section className="space-y-4">
          <div className="rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4] p-5">
            <div className="h-4 w-28 animate-pulse rounded bg-[#EAE5DA]" />
            <div className="mt-4 h-10 w-44 animate-pulse rounded bg-[#EAE5DA]" />
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="h-8 w-24 animate-pulse rounded-lg bg-[#EAE5DA]" />
              <div className="h-8 w-28 animate-pulse rounded-lg bg-[#EAE5DA]" />
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-[#EAE5DA]" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl border border-[#DCD6C9] bg-[#FBF9F4]"
              />
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-[#DCD6C9]">
            <div className="h-11 animate-pulse bg-[#EDE8DE]" />
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-t border-[#DCD6C9] px-4 py-5"
              >
                <div className="h-4 w-28 animate-pulse rounded bg-[#EAE5DA]" />
                <div className="h-4 w-20 animate-pulse rounded bg-[#EAE5DA]" />
              </div>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl border border-[#DCD6C9] bg-[#FBF9F4]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
