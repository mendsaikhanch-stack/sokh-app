import {
  X, ShoppingCart, Minus, Plus, Trash2,
} from "lucide-react";
import useApp from "../../hooks/useApp";
import { fmt } from "../../utils/helpers";

export default function CartSidebar() {
  const {
    cd, bd, txS, aL, lang, t,
    cart, dc, cartCount, cartTotal,
    setShowCart, setShowCheckout, setCheckoutStep, addToast,
  } = useApp();
  return (
    <div className="fixed inset-0 z-50" onClick={() => setShowCart(false)}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-sm ${cd} shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between p-4 border-b ${bd}`}>
          <h3 className="font-bold text-lg">
            {t.yourCart} ({cartCount})
          </h3>
          <button onClick={() => setShowCart(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className={`text-center py-12 ${txS}`}>
              <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
              <p>{t.cartEmpty}</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl border ${bd}`}>
                <div
                  className={`w-14 h-14 rounded-lg ${aL} overflow-hidden flex-shrink-0`}
                >
                  {item.img.startsWith("http") ? (
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {item.emoji || item.img}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {lang === "mn" ? item.name.mn : item.name.en}
                  </p>
                  <p className={`text-xs ${txS}`}>{item.model}</p>
                  <p className="font-bold text-sm text-amber-500">
                    {fmt(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => dc({ type: "DEC", i })}
                      className={`w-6 h-6 rounded flex items-center justify-center border ${bd}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => dc({ type: "INC", i })}
                      className={`w-6 h-6 rounded flex items-center justify-center border ${bd}`}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => {
                        dc({ type: "REMOVE", i });
                        addToast(t.removedFromCart);
                      }}
                      className="ml-auto text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={`p-4 border-t ${bd}`}>
            <div className="flex justify-between mb-3 font-bold">
              {t.total}
              <span className="text-amber-500">{fmt(cartTotal)}</span>
            </div>
            <button
              onClick={() => {
                setShowCart(false);
                setShowCheckout(true);
                setCheckoutStep(0);
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              {t.placeOrder}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
