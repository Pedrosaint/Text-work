import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { formatNaira } from "../../../utils/naira_function";

export default function CartSummary() {
  
  const cart = useSelector((state: RootState) => state.cart.items);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);
  return (
    <div className="flex items-center gap-2">
      <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
      <span className="font-semibold text-white/60">{itemCount} items</span>
      <span className="text-gray-400">/ {formatNaira(total)}</span>
    </div>
  );
}
