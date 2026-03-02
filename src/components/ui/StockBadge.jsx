import useApp from "../../hooks/useApp";
import { LOW_STOCK_THRESHOLD } from "../../data/products";

export default function StockBadge({ stock }) {
  const { t } = useApp();
  if (stock === 0)
    return (
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        {t.outOfStock}
      </span>
    );
  if (stock <= LOW_STOCK_THRESHOLD)
    return (
      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">
        {t.lowStock} {stock}
        {t.onlyLeft}
      </span>
    );
  return null;
}
