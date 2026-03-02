import { AlertTriangle } from "lucide-react";
import useApp from "../../hooks/useApp";
import { LOW_STOCK_THRESHOLD } from "../../data/products";
import { fmt } from "../../utils/helpers";

export default function ProductsTab() {
  const { dark, cd, bd, txS, lang, t, products } = useApp();

  return (
    <div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
      <table className="w-full text-sm">
        <thead className={dark ? "bg-gray-700" : "bg-gray-50"}>
          <tr>
            {[t.name, t.price, "Stock", t.status].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className={`border-t ${bd} ${
                p.stock <= LOW_STOCK_THRESHOLD
                  ? "bg-red-50 dark:bg-red-900/20"
                  : ""
              }`}
            >
              <td className="px-4 py-3 font-medium">
                {p.emoji || "📦"}{" "}
                {lang === "mn" ? p.name.mn : p.name.en}{" "}
                <span className={`text-xs ${txS}`}>({p.model})</span>
              </td>
              <td className="px-4 py-3">{fmt(p.price)}</td>
              <td className="px-4 py-3">
                {p.stock <= LOW_STOCK_THRESHOLD && p.stock > 0 ? (
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {p.stock}
                  </span>
                ) : p.stock === 0 ? (
                  <span className="text-red-500">{t.outOfStock}</span>
                ) : (
                  p.stock
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    p.cond === "new"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {p.cond === "new" ? t.new : t.used}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
