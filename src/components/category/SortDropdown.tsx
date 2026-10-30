import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function SortDropdown({
  sortBy,
  onSortChange,
}: SortDropdownProps) {
  return (
    <div className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#DCD6C9] py-2 pl-3 pr-2 text-sm text-[#68675F] outline-none transition-colors hover:border-[#B8B09F]">
      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label="পণ্যের দাম অনুযায়ী সাজান"
        className="cursor-pointer appearance-none bg-transparent outline-none"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>

      <ChevronDown
        size={14}
        strokeWidth={2}
        className="pointer-events-none shrink-0"
      />
    </div>
  );
}
