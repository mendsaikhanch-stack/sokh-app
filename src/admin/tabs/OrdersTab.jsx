import { Phone } from "lucide-react";
import useApp from "../../hooks/useApp";
import { fmt } from "../../utils/helpers";

export default function OrdersTab() {
  const { dark, cd, bd, inp, t, orders, setOrders } = useApp();

  return (
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
          {orders.map((o, i) => (
            <tr key={o.id} className={`border-t ${bd}`}>
              <td className="px-3 py-3 font-mono text-xs">{o.id}</td>
              <td className="px-3 py-3">{o.customer}</td>
              <td className="px-3 py-3">
                <a
                  href={`tel:${o.phone.replace(/-/g, "")}`}
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
                  onChange={(e) =>
                    setOrders((p) =>
                      p.map((x, j) =>
                        j === i ? { ...x, status: e.target.value } : x
                      )
                    )
                  }
                  className={`text-xs px-2 py-1 rounded ${inp}`}
                >
                  <option value="new">{t.orderNew}</option>
                  <option value="processing">{t.orderProcessing}</option>
                  <option value="delivered">{t.orderDelivered}</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
