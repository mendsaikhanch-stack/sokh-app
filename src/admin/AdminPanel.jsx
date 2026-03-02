import {
  Sun, Moon, Bell, BarChart3, Globe, Timer, Package,
  ClipboardList, AlertTriangle, Settings,
} from "lucide-react";
import useApp from "../hooks/useApp";
import ShieldLogo from "../components/ui/ShieldLogo";
import NotifsDropdown from "../components/ui/NotifsDropdown";
import OverviewTab from "./tabs/OverviewTab";
import SocialTab from "./tabs/SocialTab";
import SchedulerTab from "./tabs/SchedulerTab";
import ProductsTab from "./tabs/ProductsTab";
import OrdersTab from "./tabs/OrdersTab";
import AlertsTab from "./tabs/AlertsTab";
import SettingsTab from "./tabs/SettingsTab";

export default function AdminPanel() {
  const {
    dark, setDark, lang, setLang, bg, tx, hdr, bd, cd, txS, aL, t,
    adminTab, setAdminTab, stockAlerts,
    showNotifs, setShowNotifs, unreadCount, setAdminView,
  } = useApp();

  return (
    <div
      className={`min-h-screen ${bg} ${tx} transition-colors duration-300`}
    >
      <header
        className={`${hdr} border-b ${bd} px-4 py-3 flex items-center justify-between sticky top-0 z-40`}
      >
        <div className="flex items-center gap-3">
          <ShieldLogo size="xs" dark={dark} />
          <span
            className={`text-sm px-2 py-0.5 rounded ${aL} text-amber-500 font-medium`}
          >
            {t.admin}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className={`p-2 rounded-lg ${cd} relative`}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifs && <NotifsDropdown />}
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg ${cd}`}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className={`px-2 py-1 rounded text-xs ${cd}`}
          >
            {lang === "mn" ? "EN" : "MN"}
          </button>
          <button
            onClick={() => setAdminView(false)}
            className="px-3 py-1.5 rounded-lg text-sm bg-amber-500 text-white"
          >
            {t.backToShop}
          </button>
        </div>
      </header>
      <div className="flex">
        <aside
          className={`w-52 min-h-screen ${cd} border-r ${bd} p-3 hidden md:block`}
        >
          {[
            ["overview", BarChart3, t.overview],
            ["social", Globe, t.socialDashboard],
            ["scheduler", Timer, t.scheduler],
            ["products", Package, t.productMgmt],
            ["orders", ClipboardList, t.orderMgmt],
            ["alerts", AlertTriangle, t.stockAlerts],
            ["settings", Settings, t.settings],
          ].map(([k, I, l]) => (
            <button
              key={k}
              onClick={() => setAdminTab(k)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left text-sm transition ${
                adminTab === k
                  ? `${aL} text-amber-500 font-medium`
                  : txS
              }`}
            >
              <I size={17} />
              {l}
              {k === "alerts" && stockAlerts.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {stockAlerts.length}
                </span>
              )}
            </button>
          ))}
        </aside>
        {/* Mobile admin tabs */}
        <div
          className={`md:hidden flex overflow-x-auto border-b ${bd} ${cd} w-full`}
        >
          {[
            ["overview", t.overview],
            ["social", "Social"],
            ["scheduler", t.scheduler],
            ["products", t.productMgmt],
            ["orders", t.orderMgmt],
            ["alerts", "⚠️"],
            ["settings", "⚙️"],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setAdminTab(k)}
              className={`px-4 py-3 text-xs whitespace-nowrap ${
                adminTab === k
                  ? "text-amber-500 font-medium border-b-2 border-amber-500"
                  : txS
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <main className="flex-1 p-4 md:p-6">
          {adminTab === "overview" && <OverviewTab />}
          {adminTab === "social" && <SocialTab />}
          {adminTab === "scheduler" && <SchedulerTab />}
          {adminTab === "products" && <ProductsTab />}
          {adminTab === "orders" && <OrdersTab />}
          {adminTab === "alerts" && <AlertsTab />}
          {adminTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
