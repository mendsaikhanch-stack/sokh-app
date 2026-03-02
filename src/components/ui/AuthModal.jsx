import { X } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function AuthModal() {
  const { cd, inp, txS, t, setUser, setShowAuth } = useApp();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setShowAuth(false)}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`relative ${cd} rounded-2xl p-6 w-full max-w-sm shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowAuth(false)}
          className="absolute top-3 right-3"
        >
          <X size={18} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-amber-500">{t.login}</h3>
        <input
          className={`w-full px-3 py-2 rounded-lg border mb-3 ${inp}`}
          placeholder={t.email}
          id="ae"
        />
        <input
          className={`w-full px-3 py-2 rounded-lg border mb-4 ${inp}`}
          placeholder={t.password}
          type="password"
          id="ap"
        />
        <button
          onClick={() => {
            const e = document.getElementById("ae")?.value;
            const p = document.getElementById("ap")?.value;
            if (e === "admin@shop.mn" && p === "admin123")
              setUser({ name: "Admin", isAdmin: true });
            else if (e) setUser({ name: e.split("@")[0], isAdmin: false });
            setShowAuth(false);
          }}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
        >
          {t.login}
        </button>
        <p className={`text-xs mt-3 ${txS} text-center`}>
          Админ: admin@shop.mn / admin123
        </p>
      </div>
    </div>
  );
}
