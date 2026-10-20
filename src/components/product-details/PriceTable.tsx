import { ProductInterface } from "../../types/interface";
import { formatPrice } from "@/lib/utils";

export default function PriceTable({ product }: { product: ProductInterface }) {
  return (
    <section className="mt-5">
      <h2 className="text-base font-bold text-neutral-900">দামের ইতিহাস</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "আজকের দাম", value: product.today },
          { label: "গত সপ্তাহের দাম", value: product.lastWeek },
          { label: "গত মাসের দাম", value: product.lastMonth },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-neutral-100 p-4">
            <p className="text-xs text-neutral-500">{item.label}</p>

            <p className="mt-2 text-lg font-bold text-neutral-900">
              {formatPrice(item.value)}{" "}
              <span className="text-xs font-normal text-neutral-500">
                টাকা / {product.unit}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
