import {
  Package, ClipboardList, TrendingUp, AlertTriangle,
} from "lucide-react";
import useApp from "../../hooks/useApp";
import { fmt } from "../../utils/helpers";

export default function OverviewTab() {
  const { cd, bd, txS, aL, lang, t, products, orders, stockAlerts } =
    useApp();

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          [t.totalProducts, products.length, Package, "text-blue-500"],
          [t.totalOrders, orders.length, ClipboardList, "text-green-500"],
          [
            t.totalRevenue,
            fmt(orders.reduce((s, o) => s + o.total, 0)),
            TrendingUp,
            "text-amber-500",
          ],
          [t.stockAlerts, stockAlerts.length, AlertTriangle, "text-red-500"],
        ].map(([l, v, I, c], i) => (
          <div key={i} className={`${cd} rounded-xl p-5 border ${bd}`}>
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${txS}`}>{l}</span>
              <I size={18} className={c} />
            </div>
            <div className="text-2xl font-bold">{v}</div>
          </div>
        ))}
      </div>
      {stockAlerts.length > 0 && (
        <div className={`${cd} rounded-xl border border-orange-300 p-4 mb-6`}>
          <h3 className="font-bold text-sm text-orange-500 flex items-center gap-2 mb-3">
            <AlertTriangle size={16} />
            {t.stockWarning}
          </h3>
          <div className="space-y-2">
            {stockAlerts.map((p) => (
              <div
                key={p._id || p.id}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {p.emoji || "📦"}{" "}
                  {lang === "mn" ? p.name.mn : p.name.en}{" "}
                  <span className={txS}>({p.model})</span>
                </span>
                <span className="text-red-500 font-bold">
                  {p.stock} {t.onlyLeft}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
