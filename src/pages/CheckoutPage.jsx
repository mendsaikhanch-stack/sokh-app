import {
  ChevronRight, Check, Package, Truck, Zap, MapPin, Send,
  QrCode, CreditCard, Banknote, Calendar,
} from "lucide-react";
import useApp from "../hooks/useApp";
import { fmt, trackPurchase } from "../utils/helpers";

export default function CheckoutPage() {
  const {
    cd, bd, txS, aL, inp, lang, t, BIZ,
    cart, dc, cartTotal, deliveryFee, grandTotal,
    checkoutStep, setCheckoutStep,
    payMethod, setPayMethod,
    deliveryMethod, setDeliveryMethod,
    deliveryForm, setDeliveryForm,
    checkoutForm, setCheckoutForm,
    setShowCheckout, navTo,
  } = useApp();

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        {[t.shipping, t.payment, t.review, t.confirmation].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= checkoutStep
                  ? "bg-amber-500 text-white"
                  : `border-2 ${bd} ${txS}`
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs hidden sm:inline ${
                i <= checkoutStep ? "text-amber-500 font-medium" : txS
              }`}
            >
              {s}
            </span>
            {i < 3 && <ChevronRight size={16} className={txS} />}
          </div>
        ))}
      </div>
      <div className={`${cd} rounded-2xl p-6 border ${bd}`}>
        {/* Step 0: Delivery */}
        {checkoutStep === 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-2">{t.deliveryMethod}</h3>
            <p className={`text-xs ${txS} -mt-2 mb-2`}>
              {t.freeDeliveryOver}
            </p>
            <div className="space-y-2">
              {[
                ["pickup", Package, t.deliveryPickup, t.deliveryPickupDesc, t.deliveryPickupPrice, "text-green-500"],
                ["ub", Truck, t.deliveryUB, t.deliveryUBDesc, cartTotal >= 100000 ? t.deliveryFree : t.deliveryUBPrice, "text-blue-500"],
                ["express", Zap, t.deliveryExpress, t.deliveryExpressDesc, t.deliveryExpressPrice, "text-amber-500"],
                ["province", MapPin, t.deliveryProvince, t.deliveryProvinceDesc, t.deliveryProvincePrice, "text-purple-500"],
                ["courier", Send, t.deliveryCourier, t.deliveryCourierDesc, t.deliveryCourierPrice, "text-teal-500"],
              ].map(([k, I, label, desc, price, clr]) => (
                <button
                  key={k}
                  onClick={() => setDeliveryMethod(k)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${
                    deliveryMethod === k
                      ? `border-amber-500 ${aL}`
                      : bd
                  }`}
                >
                  <I size={22} className={clr} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{label}</p>
                    <p className={`text-xs ${txS}`}>{desc}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        k === "pickup" ||
                        (k === "ub" && cartTotal >= 100000)
                          ? "text-green-500"
                          : "text-amber-500"
                      }`}
                    >
                      {price}
                    </span>
                  </div>
                  {deliveryMethod === k && (
                    <Check size={18} className="text-amber-500" />
                  )}
                </button>
              ))}
            </div>
            {deliveryMethod !== "pickup" && (
              <div
                className={`space-y-3 p-4 rounded-xl border ${bd} ${aL} mt-3`}
              >
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-amber-500" />
                  {t.deliveryAddress}
                </h4>
                <input
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`}
                  placeholder={t.name}
                  value={checkoutForm.name}
                  onChange={(e) =>
                    setCheckoutForm({ ...checkoutForm, name: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    className={`px-3 py-2 rounded-lg border text-sm ${inp}`}
                    placeholder={t.phone}
                    value={checkoutForm.phone}
                    onChange={(e) =>
                      setCheckoutForm({
                        ...checkoutForm,
                        phone: e.target.value,
                      })
                    }
                  />
                  <input
                    type="tel"
                    className={`px-3 py-2 rounded-lg border text-sm ${inp}`}
                    placeholder={t.deliveryPhone}
                    value={deliveryForm.phone2}
                    onChange={(e) =>
                      setDeliveryForm({
                        ...deliveryForm,
                        phone2: e.target.value,
                      })
                    }
                  />
                </div>
                {(deliveryMethod === "ub" || deliveryMethod === "express") && (
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      className={`px-3 py-2 rounded-lg border text-sm ${inp}`}
                      value={deliveryForm.district}
                      onChange={(e) =>
                        setDeliveryForm({
                          ...deliveryForm,
                          district: e.target.value,
                        })
                      }
                    >
                      <option value="">{t.deliveryDistrict}</option>
                      {[
                        "БГД", "БЗД", "ЧД", "СБД", "СХД", "ХУД", "БНД",
                        "НД", "ХАД",
                      ].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <input
                      className={`px-3 py-2 rounded-lg border text-sm ${inp}`}
                      placeholder={t.deliveryKhoroo}
                      value={deliveryForm.khoroo}
                      onChange={(e) =>
                        setDeliveryForm({
                          ...deliveryForm,
                          khoroo: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <input
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`}
                  placeholder={
                    deliveryMethod === "province" ||
                    deliveryMethod === "courier"
                      ? t.address
                      : t.deliveryBuilding
                  }
                  value={deliveryForm.building || checkoutForm.address}
                  onChange={(e) => {
                    setDeliveryForm({
                      ...deliveryForm,
                      building: e.target.value,
                    });
                    setCheckoutForm({
                      ...checkoutForm,
                      address: e.target.value,
                    });
                  }}
                />
                {(deliveryMethod === "ub" || deliveryMethod === "express") && (
                  <input
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`}
                    placeholder={t.deliveryApartment}
                    value={deliveryForm.apartment}
                    onChange={(e) =>
                      setDeliveryForm({
                        ...deliveryForm,
                        apartment: e.target.value,
                      })
                    }
                  />
                )}
                <textarea
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${inp} resize-none`}
                  rows={2}
                  placeholder={t.deliveryNote}
                  value={deliveryForm.note}
                  onChange={(e) =>
                    setDeliveryForm({ ...deliveryForm, note: e.target.value })
                  }
                />
              </div>
            )}
            {deliveryMethod === "pickup" && (
              <div className={`p-4 rounded-xl border ${bd} ${aL}`}>
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-green-500" />
                  {t.deliveryPickup}
                </h4>
                <a
                  href={BIZ.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-500 underline"
                >
                  {BIZ.address}
                </a>
                <p className={`text-xs ${txS} mt-1`}>
                  ☎️{" "}
                  <a href={`tel:${BIZ.phone.replace(/-/g, "")}`} className="hover:text-amber-500">
                    {BIZ.phone}
                  </a>
                </p>
                <p className={`text-xs ${txS}`}>{BIZ.workHours}</p>
              </div>
            )}
            <div
              className={`flex justify-between items-center p-3 rounded-lg ${aL}`}
            >
              <span className={`text-sm ${txS}`}>{t.deliveryTotal}:</span>
              <span
                className={`font-bold ${
                  deliveryFee === 0 ? "text-green-500" : "text-amber-500"
                }`}
              >
                {deliveryFee === 0 ? t.deliveryFree : fmt(deliveryFee)}
              </span>
            </div>
            <button
              onClick={() => setCheckoutStep(1)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              {t.next} →
            </button>
          </div>
        )}

        {/* Step 1: Payment */}
        {checkoutStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">{t.paymentMethod}</h3>
            {[
              ["qpay", QrCode, t.qpay, t.qpayDesc, "text-blue-500"],
              [
                "bank",
                CreditCard,
                t.bankTransfer,
                `${t.bankName} | ${t.accountNo}`,
                "text-green-600",
              ],
              ["cash", Banknote, t.cash, t.cashDesc, "text-amber-600"],
              [
                "installment",
                Calendar,
                t.installment,
                t.installmentDesc,
                "text-purple-600",
              ],
            ].map(([k, I, label, desc, clr]) => (
              <button
                key={k}
                onClick={() => setPayMethod(k)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition ${
                  payMethod === k
                    ? `border-amber-500 ${aL}`
                    : `${bd}`
                }`}
              >
                <I size={28} className={clr} />
                <div>
                  <p className="font-medium">{label}</p>
                  <p className={`text-xs ${txS}`}>{desc}</p>
                </div>
                {payMethod === k && (
                  <Check size={20} className="ml-auto text-amber-500" />
                )}
              </button>
            ))}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setCheckoutStep(0)}
                className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}
              >
                ← {t.prev}
              </button>
              <button
                onClick={() => setCheckoutStep(2)}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              >
                {t.next} →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {checkoutStep === 2 && (
          <div>
            <h3 className="font-bold text-lg mb-4">{t.review}</h3>
            <div className="space-y-2 mb-3">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between py-2 border-b ${bd}`}
                >
                  <span className="text-sm">
                    {item.emoji || "📦"}{" "}
                    {lang === "mn" ? item.name.mn : item.name.en} x{item.qty}
                  </span>
                  <span className="font-medium text-sm">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className={`flex justify-between py-2 text-sm ${txS}`}>
              <span>
                {t.total} ({lang === "mn" ? "барааны" : "items"}):
              </span>
              <span>{fmt(cartTotal)}</span>
            </div>
            <div className={`flex justify-between py-2 text-sm ${txS}`}>
              <span>
                {t.deliveryTotal} (
                {deliveryMethod === "pickup"
                  ? t.deliveryPickup
                  : deliveryMethod === "express"
                  ? t.deliveryExpress
                  : deliveryMethod === "ub"
                  ? t.deliveryUB
                  : deliveryMethod === "province"
                  ? t.deliveryProvince
                  : t.deliveryCourier}
                ):
              </span>
              <span className={deliveryFee === 0 ? "text-green-500" : ""}>
                {deliveryFee === 0 ? t.deliveryFree : fmt(deliveryFee)}
              </span>
            </div>
            <div
              className={`flex justify-between py-3 border-t ${bd} font-bold text-lg mt-2`}
            >
              {t.total}
              <span className="text-amber-500">{fmt(grandTotal)}</span>
            </div>
            <div className={`p-3 rounded-xl ${aL} mt-3 text-sm space-y-1`}>
              <p className="font-medium flex items-center gap-2">
                {deliveryMethod === "pickup" ? (
                  <Package size={14} className="text-green-500" />
                ) : (
                  <Truck size={14} className="text-blue-500" />
                )}
                {deliveryMethod === "pickup"
                  ? t.deliveryPickup
                  : t.deliveryAddress}
              </p>
              {deliveryMethod !== "pickup" && (
                <>
                  <p className={txS}>
                    {checkoutForm.name} |{" "}
                    <a
                      href={`tel:${checkoutForm.phone.replace(/-/g, "")}`}
                      className="text-amber-500 hover:underline"
                    >
                      {checkoutForm.phone}
                    </a>
                  </p>
                  <p className={txS}>
                    {deliveryForm.district} {deliveryForm.khoroo}{" "}
                    {deliveryForm.building || checkoutForm.address}{" "}
                    {deliveryForm.apartment}
                  </p>
                </>
              )}
              {deliveryMethod === "pickup" && (
                <p className={txS}>{BIZ.address}</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setCheckoutStep(1)}
                className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}
              >
                ← {t.prev}
              </button>
              <button
                onClick={() => {
                  setCheckoutStep(3);
                  trackPurchase(grandTotal);
                  dc({ type: "CLEAR" });
                }}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              >
                {t.placeOrder}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {checkoutStep === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">
              {t.orderSuccess}
            </h3>
            <p className={txS}>{t.orderSuccessDesc}</p>
            <div
              className={`mt-6 p-4 rounded-xl border ${bd} ${aL} text-left max-w-sm mx-auto`}
            >
              <p className="font-bold text-sm mb-3 flex items-center gap-2">
                <Truck size={16} className="text-amber-500" />
                {t.deliveryTracking}
              </p>
              <div className="flex items-center gap-2 mb-4">
                {[
                  t.statusPreparing,
                  t.statusShipped,
                  t.statusDelivering,
                  t.statusDelivered,
                ].map((s, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div
                      className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs ${
                        i === 0
                          ? "bg-amber-500 text-white"
                          : `border-2 ${bd} ${txS}`
                      }`}
                    >
                      {i === 0 ? <Check size={12} /> : i + 1}
                    </div>
                    <p
                      className={`text-xs ${
                        i === 0 ? "text-amber-500 font-medium" : txS
                      }`}
                    >
                      {s}
                    </p>
                  </div>
                ))}
              </div>
              <p className={`text-xs ${txS}`}>
                {t.estimatedDelivery}:{" "}
                {deliveryMethod === "express"
                  ? lang === "mn"
                    ? "Өнөөдөр"
                    : "Today"
                  : deliveryMethod === "pickup"
                  ? lang === "mn"
                    ? "Одоо авах боломжтой"
                    : "Available now"
                  : deliveryMethod === "ub"
                  ? "1-3 " + (lang === "mn" ? "хоног" : "days")
                  : deliveryMethod === "province"
                  ? "3-7 " + (lang === "mn" ? "хоног" : "days")
                  : "5-10 " + (lang === "mn" ? "хоног" : "days")}
              </p>
            </div>
            <p className={`mt-3 text-sm ${txS}`}>☎️ {BIZ.phone}</p>
            <button
              onClick={() => {
                setShowCheckout(false);
                setCheckoutStep(0);
                navTo("home");
              }}
              className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              {t.backToShop}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
