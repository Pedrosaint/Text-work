import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import ProductCard from "./ProductCard";
import type { AppDispatch, RootState } from "../../../app/store";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, filter, search } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = items.filter(
    (p) =>
      (filter === "all" || !filter || p.category === filter) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 rounded-2xl shadow-sm"
            ></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-500 text-center p-8 text-lg font-semibold">
          {error}
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            layout
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-gray-500 text-center mt-20 text-lg">
          No products found for “{search}”.
        </div>
      )}
    </div>
  );
}
