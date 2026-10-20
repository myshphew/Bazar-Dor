import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#dfe8df] bg-[#fbfdfb]">
      <div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-3 px-4 py-5 text-[11px] text-[#626c64] sm:flex-row sm:items-center sm:px-6 lg:px-0">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দামের এক নজরে</p>

        <p>সকল দাম সম্ভাব্য; বাজারের অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
