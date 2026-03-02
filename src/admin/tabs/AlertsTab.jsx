import { AlertTriangle } from "lucide-react";
import useApp from "../../hooks/useApp";
import { LOW_STOCK_THRESHOLD } from "../../data/products";
import { fmt } from "../../utils/helpers";

export default function AlertsTab() {
  const { cd, bd, txS, aL, lang, t, products } = useApp();

  return (
    <div>
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-500" size={20} />
        {t.stockAlerts}
      </h3>
      <div className={`${cd} rounded-xl border ${bd} p-4 mb-4`}>
        <p className={`text-sm ${txS} mb-2`}>
          {t.alertThreshold}:{" "}
          <span className="font-bold text-red-500">{LOW_STOCK_THRESHOLD}</span>
        </p>
        <p className={`text-sm ${txS}`}>
          {lang === "mn"
            ? "Нөөц 3-с бага болоход автоматаар мэдэгдэл илгээнэ"
            : "Auto-notify when stock drops below 3"}
        </p>
      </div>
      <div className="space-y-3">
        {products
          .filter((p) => p.stock <= LOW_STOCK_THRESHOLD)
          .map((p) => (
            <div
              key={p.id}
              className={`${cd} rounded-xl border ${
                p.stock === 0 ? "border-red-400" : "border-orange-300"
              } p-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.emoji || "📦"}</span>
                <div>
                  <p className="font-medium">
                    {lang === "mn" ? p.name.mn : p.name.en}
                  </p>
                  <p className={`text-xs ${txS}`}>
                    {p.model} | {fmt(p.price)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-2xl font-bold ${
                    p.stock === 0 ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  {p.stock}
                </p>
                <p
                  className={`text-xs ${
                    p.stock === 0 ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  {p.stock === 0 ? t.outOfStock : t.lowStock}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
