import { Phone } from "lucide-react";
import useApp from "../hooks/useApp";
import { svcList } from "../data/services";

export default function ServicesPage({ isHome = false }) {
  const { dark, cd, bd, txS, t, page, BIZ } = useApp();

  return (
    <section
      className={`${
        isHome ? (dark ? "bg-gray-800" : "bg-white") : ""
      } py-12`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t.ourServices}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {svcList.map((s, i) => {
            const I = s.icon;
            return (
              <div
                key={i}
                className={`${cd} rounded-xl p-5 border ${bd} hover:shadow-lg transition text-center`}
              >
                <I size={32} className="mx-auto mb-3 text-amber-500" />
                <h3 className="font-bold text-sm mb-1">{t[s.key]}</h3>
                <p className={`text-xs ${txS}`}>{s.price}</p>
              </div>
            );
          })}
        </div>
        {!isHome && (
          <div className="text-center mt-8">
            <a
              href={`tel:${BIZ.phone}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              <Phone size={18} />
              {t.callUs}: {BIZ.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
