import { MarketStats, ProductInterface } from "@/types/interface";
import { formatPrice, getUnitBn } from "@/lib/utils";

interface MarketPriceDetailsProps {
  product: ProductInterface;
  markets: MarketStats[];
}

export default function MarketPriceDetails({
  product,
  markets,
}: MarketPriceDetailsProps) {
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
    <section className="flex flex-col">
      <div className="mt-10 flex flex-col gap-3">
        <h2 className="text-base font-bold text-[#20221E]">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-3 divide-x divide-[#DCD6C9] rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4]">
          <div className="min-w-0 p-3 sm:p-6">
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              সর্বনিম্ন
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-[#42634A] sm:text-2xl">
              {lowestPrice !== null ? `৳${formatPrice(lowestPrice)}` : "—"}
            </p>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              সর্বনিম্ন দামের বাজার
            </p>
          </div>

          <div className="min-w-0 p-3 sm:p-6">
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              সর্বাধিক
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-[#A54538] sm:text-2xl">
              {highestPrice !== null ? `৳${formatPrice(highestPrice)}` : "—"}
            </p>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              সর্বোচ্চ দামের বাজার
            </p>
          </div>

          <div className="min-w-0 p-3 sm:p-6">
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              গড় দাম
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-[#20221E] sm:text-2xl">
              ৳{formatPrice(averagePrice)}
            </p>
            <p className="mt-1 text-[10px] text-[#68675F] sm:text-xs">
              {getUnitBn(product.unit)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <h2 className="text-base font-bold text-[#20221E]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#DCD6C9]">
          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-xl table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[18.75%]" />
                  <col className="w-[18.75%]" />
                  <col className="w-[18.75%]" />
                  <col className="w-[18.75%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#DCD6C9] text-[#68675F]">
                    <th className="px-4 py-3 font-semibold">বাজার</th>
                    <th className="px-4 py-3 font-semibold">বিভাগ</th>
                    <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                    <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                    <th className="px-4 py-3 font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;
                    return (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className={`border-t border-[#DCD6C9] transition-colors hover:bg-[#E8E2D7] ${
                          index % 2 === 0 ? "bg-[#F4F0E7]" : "bg-[#EDE8DE]"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-[#20221E]">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-[#68675F]">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 text-[#42634A]">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="px-4 py-3 text-[#A54538]">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="px-4 py-3 font-medium text-[#20221E]">
                          ৳{formatPrice(average)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-[#68675F]">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
