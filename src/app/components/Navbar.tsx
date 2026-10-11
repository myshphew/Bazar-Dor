import CategoryNavLinks from "./CategoryNavLinks";
import MarqueeBar from "./MarqueeBar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#f2f2f2]">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex gap-1.5 items-center">
          <div className="h-12 w-12 bg-teal-600 rounded-sm"></div>
          <div>
            <h2>বাজার দর</h2>
            <p>মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          <p>Mushfique</p>
        </div>
      </div>
      <CategoryNavLinks />
      <MarqueeBar />
    </nav>
  );
}
