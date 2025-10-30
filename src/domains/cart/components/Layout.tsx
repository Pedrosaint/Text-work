import CartSummary from "./CartSummary";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearch } from "../../product/slices/productSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { CiSearch } from "react-icons/ci";

const categories = [
  "all",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filter, search } = useSelector((state: RootState) => state.products);

  return (
    <div className="min-h-screen bg-black/80">
      <header className="flex flex-col gap-y-3 sm:flex-row justify-between items-center px-6 py-4 shadow-lg bg-white/90 dark:bg-slate-950/90 sticky top-0 z-10 mb-6 border-b border-gray-100 dark:border-slate-900">
        {/* Logo */}
        <div className="text-3xl font-black tracking-tight text-blue-700 dark:text-blue-200 mr-4">
          FakeStore
        </div>
        {/* Filter/Search Controls */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          {/* Category Buttons */}
          <div className="flex gap-1 flex-wrap">
            {categories.map((c) => {
              const value = c === "all" ? "" : c;
              const active = filter === value || (filter === "" && c === "all");
              return (
                <button
                  key={c}
                  onClick={() => dispatch(setFilter(value))}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all shadow-sm ${
                    active
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white border-blue-700 scale-105 shadow-lg"
                      : "bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              );
            })}
          </div>
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-200 dark:border-slate-600 bg-white text-white dark:bg-slate-900 rounded-full px-4 py-2 text-xs sm:text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <CiSearch className="absolute right-3 top-2.5 text-gray-400 text-lg" />
          </div>
        </div>
        {/* Cart */}
        <button
          aria-label="Open cart"
          onClick={() => setCartOpen(true)}
          className="focus:outline-none cursor-pointer ml-4"
        >
          <CartSummary />
        </button>
      </header>
      {/* Landing Hero Section */}
      <section className="w-full py-16 pb-10 flex flex-col items-center justify-center text-center gap-4 mb-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-lg mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-4">
          The best online fake shop, fast, beautiful,{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            easy to try
          </span>
          . Search, filter, and add items to your cart from a wide collection of
          demo products powered by Redux & Tailwind.
        </p>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <a
            href="#products"
            className="px-7 py-3 rounded-full bg-blue-600 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Explore Now
          </a>
        </div>
      </section>
      <main className="container mx-auto max-w-7xl px-3" id="products">
        {children}
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
