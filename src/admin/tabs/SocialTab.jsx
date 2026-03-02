import { TrendingUp, Play, Pause, Timer } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function SocialTab() {
  const {
    cd, bd, txS, aL, t,
    SOCIALS, schedulerOn, setSchedulerOn,
  } = useApp();

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">{t.connectedAccounts}</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SOCIALS.map((s) => (
          <a
            key={s.key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cd} rounded-xl p-5 border ${bd} hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-3 mb-3">
              <s.Icon size={24} className={s.color} />
              <span className="font-bold text-sm">{s.label}</span>
            </div>
            <p className="text-2xl font-bold">{s.followers}</p>
            <p className={`text-xs ${txS}`}>{t.followers}</p>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-xs">
              <TrendingUp size={12} />
              +12%
            </div>
          </a>
        ))}
      </div>
      <h3 className="font-bold text-lg mb-4">{t.autoPost}</h3>
      <div className={`${cd} rounded-xl border ${bd} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">{t.postSchedule}</p>
            <p className={`text-sm ${txS}`}>{t.autoPostDesc}</p>
          </div>
          <button
            onClick={() => setSchedulerOn(!schedulerOn)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              schedulerOn
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {schedulerOn ? (
              <>
                <Play size={14} className="inline mr-1" />
                {t.schedulerOn}
              </>
            ) : (
              <>
                <Pause size={14} className="inline mr-1" />
                {t.schedulerOff}
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-4 mb-4">
          {["09:00", "13:00", "18:00"].map((time) => (
            <div
              key={time}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${aL}`}
            >
              <Timer size={16} className="text-amber-500" />
              <span className="font-mono font-bold">{time}</span>
            </div>
          ))}
        </div>
        <p className={`text-sm ${txS}`}>
          {t.dailyPosts}: {t.postTimes}
        </p>
      </div>
    </div>
  );
}
