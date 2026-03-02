import { X, Minus, Plus, Star, Share2 } from "lucide-react";
import useApp from "../../hooks/useApp";
import { fmt, trackAddToCart } from "../../utils/helpers";
import { LOW_STOCK_THRESHOLD } from "../../data/products";
import StockBadge from "./StockBadge";

export default function ProductModal() {
  const {
    cd, bd, txS, aL, lang, t,
    showProductModal, setShowProductModal,
    modalQty, setModalQty,
    dc, addToast, setShowShareModal,
  } = useApp();

  const p = showProductModal;
  if (!p) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setShowProductModal(null)}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`relative ${cd} rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowProductModal(null)}
          className="absolute top-3 right-3"
        >
          <X size={18} />
        </button>
        <div
          className={`w-full aspect-video rounded-xl ${aL} overflow-hidden mb-4 relative`}
        >
          {p.img.startsWith("http") ? (
            <img src={p.img} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {p.emoji || p.img}
            </div>
          )}
          {p.stock <= LOW_STOCK_THRESHOLD && p.stock > 0 && (
            <div className="absolute top-2 left-2">
              <StockBadge stock={p.stock} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              p.cond === "new"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {p.cond === "new" ? t.new : t.used}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${aL} text-amber-500`}
          >
            {p.model}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1">
          {lang === "mn" ? p.name.mn : p.name.en}
        </h3>
        <p className="text-2xl font-bold text-amber-500 mb-2">
          {fmt(p.price)}
        </p>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.floor(p.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : txS
              }
            />
          ))}
        </div>
        <p className={`mb-4 ${txS}`}>
          {lang === "mn" ? p.desc.mn : p.desc.en}
        </p>
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-sm ${txS}`}>{t.quantity}</span>
          <button
            onClick={() => setModalQty(Math.max(1, modalQty - 1))}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bd}`}
          >
            <Minus size={14} />
          </button>
          <span className="font-medium w-8 text-center">{modalQty}</span>
          <button
            onClick={() => setModalQty(modalQty + 1)}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bd}`}
          >
            <Plus size={14} />
          </button>
        </div>
        <p
          className={`text-sm mb-4 ${
            p.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {p.stock > 0
            ? `${t.inStock}: ${p.stock} ${t.items}`
            : t.outOfStock}
        </p>
        <div className="flex gap-2">
          <button
            disabled={p.stock === 0}
            onClick={() => {
              dc({ type: "ADD", p, q: modalQty });
              trackAddToCart(p);
              addToast(t.addedToCart);
              setShowProductModal(null);
              setModalQty(1);
            }}
            className={`flex-1 py-3 rounded-xl text-white font-semibold ${
              p.stock > 0
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {p.stock > 0 ? t.addToCart : t.outOfStock}
          </button>
          <button
            onClick={() => {
              setShowShareModal(p);
              setShowProductModal(null);
            }}
            className={`px-4 py-3 rounded-xl border ${bd}`}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
