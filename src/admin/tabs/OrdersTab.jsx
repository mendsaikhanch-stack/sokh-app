import { useEffect, useState } from "react";
import { Phone, RefreshCw } from "lucide-react";
import useApp from "../../hooks/useApp";
import { fmt } from "../../utils/helpers";

export default function OrdersTab() {
  const { dark, cd, bd, inp, t, orders, fetchOrdersAPI, updateOrderStatusAPI, addToast } = useApp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOrdersAPI().catch(() => {}).finally(() => setLoading(false));
  }, [fetchOrdersAPI]);

  const handleStatus = async (order, newStatus) => {
    try {
      await updateOrderStatusAPI(order._id, newStatus);
    } catch (err) {
      addToast(err.message || "Failed to update status");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => { setLoading(true); fetchOrdersAPI().catch(() => {}).finally(() => setLoading(false)); }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "..." : "Refresh"}
        </button>
      </div>
      <div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className={dark ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              {["ID", t.customer, t.phone, t.total, t.paymentMethod, t.status].map(
                (h) => (
                  <th key={h} className="px-3 py-3 text-left font-medium">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id || o.id} className={`border-t ${bd}`}>
                <td className="px-3 py-3 font-mono text-xs">{o.orderId || o.id}</td>
                <td className="px-3 py-3">{o.customer}</td>
                <td className="px-3 py-3">
                  <a
                    href={`tel:${(o.phone || "").replace(/-/g, "")}`}
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium whitespace-nowrap"
                  >
                    <Phone size={12} />
                    {o.phone}
                  </a>
                </td>
                <td className="px-3 py-3">{fmt(o.total)}</td>
                <td className="px-3 py-3 text-xs">
                  {o.pay === "qpay"
                    ? "QPay"
                    : o.pay === "bank"
                    ? "Банк"
                    : "Бэлэн"}
                </td>
                <td className="px-3 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatus(o, e.target.value)}
                    className={`text-xs px-2 py-1 rounded ${inp}`}
                  >
                    <option value="new">{t.orderNew}</option>
                    <option value="processing">{t.orderProcessing}</option>
                    <option value="delivered">{t.orderDelivered}</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                  {loading ? "Loading..." : "No orders yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
