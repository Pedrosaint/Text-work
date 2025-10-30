import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/slices/cartSlice";
import {
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch } from "../../../app/store";
import type { Product } from "../slices/productSlice";
import { toast } from "sonner";
import { formatNaira } from "../../../utils/naira_function";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();

  function handleAddToCart() {
    dispatch(addToCart(product));
    toast.success(`Added "${product.title}" to the cart!`);
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-6"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-black transition" />
          </button>

          {/* Image */}
          <div className="flex justify-center mb-6">
            <motion.img
              src={product.image}
              alt={product.title}
              className="max-h-56 object-contain rounded-lg drop-shadow-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
          </div>

          {/* Title & Category */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mb-3">{product.category}</p>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-4">
            {product.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-semibold text-blue-700">
              {formatNaira(product.price)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl w-full shadow-lg hover:shadow-xl transition"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
