import { useState } from "react";
import ProductModal from "./ProductModal";
import type { Product } from "../slices/productSlice";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="group relative border border-gray-100 bg-white/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl p-4 cursor-pointer transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

        {/* ==Product Image== */}
        <div className="flex justify-center mb-3">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-contain rounded-lg drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* ==Product Info== */}
        <div className="z-10 relative">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        </div>

        {/* Floating Add to Cart indicator */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-md">
          <ShoppingBagIcon className="w-4 h-4" />
        </div>
      </motion.div>

      {open && (
        <ProductModal product={product} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
