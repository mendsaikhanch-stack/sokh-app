import { AlertTriangle } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function NotifsDropdown() {
  const { cd, bd, txS, aL, lang, t, notifications, setNotifications } =
    useApp();
  return (
    <div
      className={`absolute right-0 top-full mt-2 w-80 ${cd} rounded-xl shadow-2xl border ${bd} z-50 max-h-96 overflow-y-auto`}
    >
      <div className={`p-3 border-b ${bd} flex justify-between items-center`}>
        <h4 className="font-bold text-sm">{t.stockAlerts}</h4>
        <button
          onClick={() =>
            setNotifications((p) => p.map((n) => ({ ...n, read: true })))
          }
          className="text-xs text-amber-500"
        >
          {t.clearFilters}
        </button>
      </div>
      {notifications.length === 0 ? (
        <p className={`p-4 text-sm ${txS} text-center`}>
          Мэдэгдэл байхгүй
        </p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 border-b ${bd} flex gap-3 ${
              !n.read ? aL : ""
            }`}
            onClick={() =>
              setNotifications((p) =>
                p.map((x) => (x.id === n.id ? { ...x, read: true } : x))
              )
            }
          >
            <AlertTriangle
              size={20}
              className="text-amber-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium">
                {n.product.emoji || "📦"}{" "}
                {lang === "mn" ? n.product.name.mn : n.product.name.en}
              </p>
              <p className="text-xs text-red-500 font-medium">
                {n.product.stock} {t.onlyLeft}! ({n.product.model})
              </p>
              <p className={`text-xs ${txS}`}>{n.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
