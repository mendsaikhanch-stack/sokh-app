import { Check } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function Toast() {
  const { toasts } = useApp();
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2"
        >
          <Check size={14} />
          {t.m}
        </div>
      ))}
    </div>
  );
}
