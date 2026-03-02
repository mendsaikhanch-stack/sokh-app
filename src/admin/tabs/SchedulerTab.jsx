import { Plus } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function SchedulerTab() {
  const { dark, cd, bd, txS, lang, t, products, scheduledPosts, SOCIALS } =
    useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{t.postSchedule}</h3>
        <button className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium flex items-center gap-2">
          <Plus size={16} />
          {t.generatePost}
        </button>
      </div>
      <div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className={dark ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              {[t.date, "⏰", t.productMgmt, "Platforms", t.status].map(
                (h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {scheduledPosts.map((sp) => {
              const spProd = sp.product;
              const prod = products.find((p) => (p._id || p.id) === (spProd?._id || spProd));
              return (
                <tr key={sp._id || sp.id} className={`border-t ${bd}`}>
                  <td className="px-4 py-3 font-mono text-xs">{sp.date}</td>
                  <td className="px-4 py-3 font-mono font-bold">{sp.time}</td>
                  <td className="px-4 py-3">
                    {prod?.emoji || "📦"}{" "}
                    {lang === "mn" ? prod?.name.mn : prod?.name.en}{" "}
                    <span className={txS}>({prod?.model})</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {sp.platforms.map((p) => {
                        const s = SOCIALS.find((x) => x.key === p);
                        return s ? (
                          <s.Icon key={p} size={16} className={s.color} />
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        sp.status === "posted"
                          ? "bg-green-100 text-green-700"
                          : sp.status === "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sp.status === "posted"
                        ? t.posted
                        : sp.status === "scheduled"
                        ? t.scheduled
                        : t.pending}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
