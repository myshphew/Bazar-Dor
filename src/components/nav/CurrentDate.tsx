import { getBanglaDate } from "@/lib/utils";

export default function CurrentDate() {
  return <p className="text-xs text-[#68675F]">{getBanglaDate()}</p>;
}
