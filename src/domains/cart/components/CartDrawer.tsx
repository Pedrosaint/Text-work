import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../slices/cartSlice";
import {
  XMarkIcon,
  TrashIcon,
  ShoppingCartIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import type { AppDispatch, RootState } from "../../../app/store";
import { formatNaira } from "../../../utils/naira_function";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = cart
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-white/90 backdrop-blur-xl border-l border-gray-200 shadow-2xl z-50 flex flex-col rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-lg text-gray-800">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
            </header>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-500 mt-20 select-none"
                >
                  <ShoppingCartIcon className="mx-auto w-10 h-10 mb-2 text-gray-400" />
                  <p className="text-sm">Your cart is currently empty.</p>
                </motion.div>
              ) : (
                <motion.ul layout className="space-y-4">
                  {cart.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 bg-white/70 border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-contain rounded-lg bg-gray-50"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800 line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatNaira(item.price)} each
                        </div>
                      </div>
                      <button
                        title="Remove from cart"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-1.5 rounded-full hover:bg-red-100 transition"
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Footer */}
            <footer className="p-5 border-t border-gray-200 bg-white/80 backdrop-blur-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="font-bold text-lg text-blue-700">
                  {formatNaira(total)}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => dispatch(clearCart())}
                  disabled={cart.length === 0}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-semibold transition ${
                    cart.length === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-red-500 to-rose-600 text-white hover:shadow-md"
                  }`}
                >
                  <TrashIcon className="w-5 h-5" />
                  Clear Cart
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-2 font-medium hover:shadow-md transition"
                >
                  <CreditCardIcon className="w-5 h-5" />
                  Continue Shopping
                </motion.button>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
