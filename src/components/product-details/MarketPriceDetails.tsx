import { MarketStats, ProductInterface } from "@/types/interface";
import { formatPrice } from "@/lib/utils";

export default function MarketPriceDetails({
  product,
  markets,
}: {
  product: ProductInterface;
  markets: MarketStats[];
}) {
  // Calculate price statistics from available market data.
  const marketAverages = markets.map((market) => (market.min + market.max) / 2);

  const lowestPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : null;

  const highestPrice =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : null;

  const averagePrice =
    marketAverages.length > 0
      ? marketAverages.reduce((sum, price) => sum + price, 0) /
        marketAverages.length
      : product.today;

  return (
    <section className="mt-5">
      <h2 className="text-base font-bold text-neutral-900">দামের সারসংক্ষেপ</h2>

      {/* Statistics Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
          <p className="text-xs text-neutral-500">সর্বনিম্ন দাম</p>

          <p className="mt-1 text-xl font-bold text-neutral-900">
            {lowestPrice !== null ? formatPrice(lowestPrice) : "—"}{" "}
            <span className="text-xs font-normal">টাকা</span>
          </p>

          <p className="mt-1 text-[11px] text-neutral-500">
            {lowestPrice !== null
              ? "সবচেয়ে কম দামের বাজার"
              : "বাজারের তথ্য পাওয়া যায়নি"}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
          <p className="text-xs text-neutral-500">সর্বাধিক দাম</p>

          <p className="mt-1 text-xl font-bold text-neutral-900">
            {highestPrice !== null ? formatPrice(highestPrice) : "—"}{" "}
            <span className="text-xs font-normal">টাকা</span>
          </p>

          <p className="mt-1 text-[11px] text-neutral-500">
            সর্বোচ্চ দামের বাজার
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
          <p className="text-xs text-neutral-500">গড় দাম</p>

          <p className="mt-1 text-xl font-bold text-neutral-900">
            {formatPrice(averagePrice)}{" "}
            <span className="text-xs font-normal">টাকা</span>
          </p>

          <p className="mt-1 text-[11px] text-neutral-500">
            প্রতি {product.unit}-এর হিসাবে
          </p>
        </div>
      </div>

      {/* Market Table */}
      <div className="mt-6">
        <h2 className="mb-3 text-base font-bold text-neutral-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-hidden rounded-2xl border border-neutral-200">
          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-500">
                    <th className="px-4 py-3 font-medium">বাজার</th>
                    <th className="px-4 py-3 font-medium">বিভাগ</th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className={`border-t border-neutral-200 transition-colors hover:bg-neutral-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-neutral-50"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-neutral-600">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 text-right text-neutral-700">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-4 py-3 text-right text-neutral-700">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                          {formatPrice(average)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center text-sm text-neutral-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
