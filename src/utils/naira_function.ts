export function formatNaira(amount: number | string): string {
  const value = Number(amount);
  if (isNaN(value)) return "₦0.00";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
}
