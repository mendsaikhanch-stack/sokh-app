import { useState, useEffect, useCallback } from "react";

const INITIAL_PRODUCTS = [
  // PRIUS сэлбэгүүд
  { id: "p001", name: "Prius Урд бампер (2016-2023)", category: "body", car: "prius", origin: "Хятад", price: 185000, stock: 12, image: "🚗", desc: "OEM чанарын урд бампер, будагдаагүй" },
  { id: "p002", name: "Prius Арын бампер (2016-2023)", category: "body", car: "prius", origin: "Хятад", price: 165000, stock: 8, image: "🚗", desc: "OEM чанарын арын бампер" },
  { id: "p003", name: "Prius LED фара зүүн (2016-2023)", category: "lights", car: "prius", origin: "Тайвань", price: 320000, stock: 5, image: "💡", desc: "LED фара, зүүн тал, Depo брэнд" },
  { id: "p004", name: "Prius LED фара баруун (2016-2023)", category: "lights", car: "prius", origin: "Тайвань", price: 320000, stock: 5, image: "💡", desc: "LED фара, баруун тал, Depo брэнд" },
  { id: "p005", name: "Prius Арын гэрэл зүүн", category: "lights", car: "prius", origin: "Хятад", price: 95000, stock: 15, image: "💡", desc: "Арын стоп гэрэл, зүүн тал" },
  { id: "p006", name: "Prius Арын гэрэл баруун", category: "lights", car: "prius", origin: "Хятад", price: 95000, stock: 15, image: "💡", desc: "Арын стоп гэрэл, баруун тал" },
  { id: "p007", name: "Prius Радиатор", category: "engine", car: "prius", origin: "Хятад", price: 210000, stock: 7, image: "🔧", desc: "1.8L хөдөлгүүрт тохирох радиатор" },
  { id: "p008", name: "Prius Тоормосны дэвсгэр урд", category: "brake", car: "prius", origin: "Тайвань", price: 45000, stock: 30, image: "🛞", desc: "Керамик тоормосны дэвсгэр, урд тэнхлэг" },
  { id: "p009", name: "Prius Тоормосны дэвсгэр арын", category: "brake", car: "prius", origin: "Тайвань", price: 38000, stock: 25, image: "🛞", desc: "Керамик тоормосны дэвсгэр, арын тэнхлэг" },
  { id: "p010", name: "Prius Тоормосны диск урд", category: "brake", car: "prius", origin: "Хятад", price: 75000, stock: 10, image: "🛞", desc: "Урд тоормосны диск, вентиляцтай" },
  { id: "p011", name: "Prius Агаарын шүүлтүүр", category: "engine", car: "prius", origin: "Хятад", price: 15000, stock: 50, image: "🔧", desc: "Хөдөлгүүрийн агаарын шүүлтүүр" },
  { id: "p012", name: "Prius Салоны шүүлтүүр", category: "engine", car: "prius", origin: "Хятад", price: 12000, stock: 50, image: "🔧", desc: "Салоны агаарын шүүлтүүр" },
  { id: "p013", name: "Prius Хибрид батарей модуль", category: "hybrid", car: "prius", origin: "Хятад", price: 450000, stock: 3, image: "🔋", desc: "Нэг модуль, 7.2V" },
  { id: "p014", name: "Prius Инвертер усны помп", category: "hybrid", car: "prius", origin: "Тайвань", price: 125000, stock: 8, image: "🔋", desc: "Инвертер хөргөлтийн помп" },
  { id: "p015", name: "Prius Хаалганы толь зүүн", category: "body", car: "prius", origin: "Тайвань", price: 85000, stock: 10, image: "🪞", desc: "Цахилгаан тохируулгатай, халаалттай" },
  { id: "p016", name: "Prius Цонхны мотор урд зүүн", category: "electric", car: "prius", origin: "Хятад", price: 65000, stock: 6, image: "⚡", desc: "Цонх өргөгч мотор" },
  // AQUA сэлбэгүүд
  { id: "a001", name: "Aqua Урд бампер (2012-2021)", category: "body", car: "aqua", origin: "Хятад", price: 155000, stock: 10, image: "🚗", desc: "OEM чанарын урд бампер, будагдаагүй" },
  { id: "a002", name: "Aqua Арын бампер (2012-2021)", category: "body", car: "aqua", origin: "Хятад", price: 135000, stock: 8, image: "🚗", desc: "OEM чанарын арын бампер" },
  { id: "a003", name: "Aqua Фара зүүн (2012-2017)", category: "lights", car: "aqua", origin: "Тайвань", price: 245000, stock: 6, image: "💡", desc: "Галоген фара, зүүн тал" },
  { id: "a004", name: "Aqua Фара баруун (2012-2017)", category: "lights", car: "aqua", origin: "Тайвань", price: 245000, stock: 6, image: "💡", desc: "Галоген фара, баруун тал" },
  { id: "a005", name: "Aqua Арын гэрэл зүүн", category: "lights", car: "aqua", origin: "Хятад", price: 78000, stock: 12, image: "💡", desc: "Арын стоп гэрэл" },
  { id: "a006", name: "Aqua Радиатор", category: "engine", car: "aqua", origin: "Хятад", price: 175000, stock: 9, image: "🔧", desc: "1.5L NZ хөдөлгүүрт тохирно" },
  { id: "a007", name: "Aqua Тоормосны дэвсгэр урд", category: "brake", car: "aqua", origin: "Тайвань", price: 38000, stock: 35, image: "🛞", desc: "Керамик тоормосны дэвсгэр" },
  { id: "a008", name: "Aqua Тоормосны дэвсгэр арын", category: "brake", car: "aqua", origin: "Тайвань", price: 32000, stock: 30, image: "🛞", desc: "Арын тоормосны дэвсгэр" },
  { id: "a009", name: "Aqua Агаарын шүүлтүүр", category: "engine", car: "aqua", origin: "Хятад", price: 12000, stock: 60, image: "🔧", desc: "Хөдөлгүүрийн агаарын шүүлтүүр" },
  { id: "a010", name: "Aqua Салоны шүүлтүүр", category: "engine", car: "aqua", origin: "Хятад", price: 10000, stock: 60, image: "🔧", desc: "Салоны агаарын шүүлтүүр" },
  { id: "a011", name: "Aqua Хибрид батарей модуль", category: "hybrid", car: "aqua", origin: "Хятад", price: 380000, stock: 4, image: "🔋", desc: "Нэг модуль, 7.2V" },
  { id: "a012", name: "Aqua Инвертер усны помп", category: "hybrid", car: "aqua", origin: "Тайвань", price: 115000, stock: 7, image: "🔋", desc: "Инвертер хөргөлтийн помп" },
  { id: "a013", name: "Aqua Хаалганы толь зүүн", category: "body", car: "aqua", origin: "Тайвань", price: 72000, stock: 10, image: "🪞", desc: "Цахилгаан, халаалттай" },
  { id: "a014", name: "Aqua Хаалганы толь баруун", category: "body", car: "aqua", origin: "Тайвань", price: 72000, stock: 10, image: "🪞", desc: "Цахилгаан, халаалттай" },
  { id: "a015", name: "Aqua CV Joint урд зүүн", category: "engine", car: "aqua", origin: "Хятад", price: 95000, stock: 5, image: "🔧", desc: "Урд зүүн CV тэнхлэг" },
  { id: "a016", name: "Aqua CV Joint урд баруун", category: "engine", car: "aqua", origin: "Хятад", price: 95000, stock: 5, image: "🔧", desc: "Урд баруун CV тэнхлэг" },
];

const CATEGORIES = [
  { id: "all", name: "Бүгд", icon: "📦" },
  { id: "body", name: "Бие", icon: "🚗" },
  { id: "lights", name: "Гэрэл", icon: "💡" },
  { id: "engine", name: "Хөдөлгүүр", icon: "🔧" },
  { id: "brake", name: "Тоормос", icon: "🛞" },
  { id: "hybrid", name: "Хибрид", icon: "🔋" },
  { id: "electric", name: "Цахилгаан", icon: "⚡" },
];

const formatPrice = (p) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";

// ─── Admin Login Component ───
function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  return (
    <div style={{ maxWidth: 360, margin: "80px auto", padding: 32, background: "#1a1a2e", borderRadius: 16, border: "1px solid #2a2a4a" }}>
      <h2 style={{ color: "#00d4aa", marginBottom: 8, fontSize: 20 }}>🔐 Админ нэвтрэх</h2>
      <p style={{ color: "#8888aa", fontSize: 13, marginBottom: 20 }}>Нууц үгээ оруулна уу</p>
      <input
        type="password"
        value={pass}
        onChange={(e) => { setPass(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && (pass === "admin123" ? onLogin() : setError("Буруу нууц үг!"))}
        placeholder="Нууц үг"
        style={{ width: "100%", padding: "12px 16px", background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 8, color: "#fff", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
      />
      {error && <p style={{ color: "#ff4466", fontSize: 13, marginBottom: 8 }}>{error}</p>}
      <button
        onClick={() => pass === "admin123" ? onLogin() : setError("Буруу нууц үг!")}
        style={{ width: "100%", padding: "12px 0", background: "linear-gradient(135deg, #00d4aa, #0088ff)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
      >
        Нэвтрэх
      </button>
      <p style={{ color: "#555", fontSize: 11, marginTop: 12, textAlign: "center" }}>Анхдагч: admin123</p>
    </div>
  );
}

// ─── Admin Panel ───
function AdminPanel({ products, setProducts, orders, onBack }) {
  const [tab, setTab] = useState("products");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "body", car: "prius", origin: "Хятад", price: "", stock: "", desc: "" });

  const startEdit = (p) => { setEditing(p.id); setForm({ name: p.name, category: p.category, car: p.car, origin: p.origin, price: p.price, stock: p.stock, desc: p.desc }); };
  const saveEdit = () => {
    setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    setEditing(null);
  };
  const addProduct = () => {
    const id = (form.car === "prius" ? "p" : "a") + String(Date.now()).slice(-4);
    const icons = { body: "🚗", lights: "💡", engine: "🔧", brake: "🛞", hybrid: "🔋", electric: "⚡" };
    setProducts(prev => [...prev, { ...form, id, price: Number(form.price), stock: Number(form.stock), image: icons[form.category] || "📦" }]);
    setForm({ name: "", category: "body", car: "prius", origin: "Хятад", price: "", stock: "", desc: "" });
  };
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const inputStyle = { padding: "8px 12px", background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 6, color: "#fff", fontSize: 13, width: "100%", boxSizing: "border-box" };
  const selectStyle = { ...inputStyle, appearance: "auto" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #2a2a4a", borderRadius: 8, color: "#8888aa", padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>← Дэлгүүр</button>
        <h2 style={{ color: "#00d4aa", margin: 0, fontSize: 22 }}>⚙️ Админ удирдлага</h2>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["products", "📦 Бараа"], ["orders", "📋 Захиалга"], ["add", "➕ Нэмэх"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "10px 20px", background: tab === k ? "#00d4aa" : "#1a1a2e", color: tab === k ? "#000" : "#ccc", border: tab === k ? "none" : "1px solid #2a2a4a", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{l}</button>
        ))}
      </div>

      {tab === "products" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a4a" }}>
                {["Нэр", "Машин", "Ангилал", "Гарал", "Үнэ", "Тоо", ""].map(h => (
                  <th key={h} style={{ padding: "10px 8px", color: "#8888aa", textAlign: "left", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #1a1a2e" }}>
                  {editing === p.id ? (
                    <>
                      <td style={{ padding: 6 }}><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></td>
                      <td style={{ padding: 6 }}><select value={form.car} onChange={e => setForm({ ...form, car: e.target.value })} style={selectStyle}><option value="prius">Prius</option><option value="aqua">Aqua</option></select></td>
                      <td style={{ padding: 6 }}><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={selectStyle}>{CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></td>
                      <td style={{ padding: 6 }}><select value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} style={selectStyle}><option>Хятад</option><option>Тайвань</option></select></td>
                      <td style={{ padding: 6 }}><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ ...inputStyle, width: 90 }} /></td>
                      <td style={{ padding: 6 }}><input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={{ ...inputStyle, width: 60 }} /></td>
                      <td style={{ padding: 6, display: "flex", gap: 4 }}>
                        <button onClick={saveEdit} style={{ background: "#00d4aa", border: "none", borderRadius: 4, color: "#000", padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✓</button>
                        <button onClick={() => setEditing(null)} style={{ background: "#333", border: "none", borderRadius: 4, color: "#aaa", padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>✕</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: "10px 8px", color: "#eee" }}>{p.image} {p.name}</td>
                      <td style={{ padding: "10px 8px", color: "#8888aa" }}>{p.car === "prius" ? "Prius" : "Aqua"}</td>
                      <td style={{ padding: "10px 8px", color: "#8888aa" }}>{CATEGORIES.find(c => c.id === p.category)?.name}</td>
                      <td style={{ padding: "10px 8px" }}><span style={{ background: p.origin === "Тайвань" ? "#1a3a2a" : "#1a2a3a", color: p.origin === "Тайвань" ? "#00d4aa" : "#4488ff", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{p.origin}</span></td>
                      <td style={{ padding: "10px 8px", color: "#00d4aa", fontWeight: 600 }}>{formatPrice(p.price)}</td>
                      <td style={{ padding: "10px 8px", color: p.stock < 5 ? "#ff4466" : "#8888aa" }}>{p.stock}</td>
                      <td style={{ padding: "10px 8px" }}>
                        <button onClick={() => startEdit(p)} style={{ background: "none", border: "none", color: "#4488ff", cursor: "pointer", fontSize: 13, marginRight: 8 }}>✏️</button>
                        <button onClick={() => deleteProduct(p.id)} style={{ background: "none", border: "none", color: "#ff4466", cursor: "pointer", fontSize: 13 }}>🗑</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <p style={{ color: "#555", textAlign: "center", padding: 40 }}>Захиалга байхгүй байна</p>
          ) : orders.map((o, i) => (
            <div key={i} style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #2a2a4a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#00d4aa", fontWeight: 600 }}>#{o.id}</span>
                <span style={{ color: "#8888aa", fontSize: 12 }}>{o.date}</span>
              </div>
              <p style={{ color: "#ccc", fontSize: 13, margin: "4px 0" }}>📞 {o.phone} | 👤 {o.name}</p>
              {o.items.map((item, j) => (
                <p key={j} style={{ color: "#8888aa", fontSize: 12, margin: "2px 0" }}>{item.name} × {item.qty} = {formatPrice(item.price * item.qty)}</p>
              ))}
              <p style={{ color: "#fff", fontWeight: 600, marginTop: 8 }}>Нийт: {formatPrice(o.total)}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "add" && (
        <div style={{ maxWidth: 500, display: "grid", gap: 12 }}>
          <div>
            <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Сэлбэгийн нэр</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="жишээ: Prius Урд бампер" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Машин</label>
              <select value={form.car} onChange={e => setForm({ ...form, car: e.target.value })} style={selectStyle}><option value="prius">Prius</option><option value="aqua">Aqua</option></select>
            </div>
            <div>
              <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Ангилал</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={selectStyle}>{CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Гарал</label>
              <select value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} style={selectStyle}><option>Хятад</option><option>Тайвань</option></select>
            </div>
            <div>
              <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Үнэ (₮)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="0" />
            </div>
            <div>
              <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Тоо ширхэг</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={inputStyle} placeholder="0" />
            </div>
          </div>
          <div>
            <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 4, display: "block" }}>Тайлбар</label>
            <input value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={inputStyle} placeholder="Сэлбэгийн тайлбар" />
          </div>
          <button onClick={addProduct} disabled={!form.name || !form.price}
            style={{ padding: "12px 0", background: form.name && form.price ? "linear-gradient(135deg, #00d4aa, #0088ff)" : "#333", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 14, cursor: form.name && form.price ? "pointer" : "default", marginTop: 8 }}>
            ➕ Бараа нэмэх
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Store ───
export default function HybridPartsStore() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("store"); // store, cart, checkout, admin-login, admin, order-success
  const [carFilter, setCarFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [lastOrder, setLastOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from storage
  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, cartRes, ordRes] = await Promise.all([
          window.storage.get("hp-products").catch(() => null),
          window.storage.get("hp-cart").catch(() => null),
          window.storage.get("hp-orders").catch(() => null),
        ]);
        if (prodRes?.value) setProducts(JSON.parse(prodRes.value));
        if (cartRes?.value) setCart(JSON.parse(cartRes.value));
        if (ordRes?.value) setOrders(JSON.parse(ordRes.value));
      } catch (e) { /* first time */ }
      setLoading(false);
    };
    load();
  }, []);

  // Save data
  const saveProducts = useCallback(async (p) => { try { await window.storage.set("hp-products", JSON.stringify(p)); } catch {} }, []);
  const saveCart = useCallback(async (c) => { try { await window.storage.set("hp-cart", JSON.stringify(c)); } catch {} }, []);
  const saveOrders = useCallback(async (o) => { try { await window.storage.set("hp-orders", JSON.stringify(o)); } catch {} }, []);

  const updateProducts = (fn) => { setProducts(prev => { const next = typeof fn === "function" ? fn(prev) : fn; saveProducts(next); return next; }); };
  const updateCart = (fn) => { setCart(prev => { const next = typeof fn === "function" ? fn(prev) : fn; saveCart(next); return next; }); };

  const addToCart = (product) => {
    updateCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) return prev.map(c => c.id === product.id ? { ...c, qty: Math.min(c.qty + 1, product.stock) } : c);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => updateCart(prev => prev.filter(c => c.id !== id));
  const updateQty = (id, qty) => updateCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, qty) } : c));

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const placeOrder = () => {
    const order = {
      id: "ORD-" + String(Date.now()).slice(-6),
      date: new Date().toLocaleString("mn-MN"),
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
      total: cartTotal,
      ...checkoutForm,
    };
    const newOrders = [...orders, order];
    setOrders(newOrders);
    saveOrders(newOrders);
    setLastOrder(order);
    updateCart([]);
    setCheckoutForm({ name: "", phone: "", address: "", note: "" });
    setView("order-success");
  };

  // Filter & sort products
  let filtered = products.filter(p => {
    if (carFilter !== "all" && p.car !== carFilter) return false;
    if (catFilter !== "all" && p.category !== catFilter) return false;
    if (originFilter !== "all" && p.origin !== originFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);

  if (loading) return (
    <div style={{ background: "#0d0d1a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#00d4aa", fontSize: 18 }}>⏳ Ачааллаж байна...</div>
    </div>
  );

  const containerStyle = { background: "#0d0d1a", minHeight: "100vh", fontFamily: "'Segoe UI', -apple-system, sans-serif", color: "#eee", maxWidth: 960, margin: "0 auto" };

  // ─── HEADER ───
  const Header = () => (
    <div style={{ background: "linear-gradient(135deg, #0d1117, #1a1a2e)", padding: "16px 20px", borderBottom: "1px solid #1a2a3a", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => setView("store")} style={{ cursor: "pointer" }}>
          <h1 style={{ margin: 0, fontSize: 20, background: "linear-gradient(135deg, #00d4aa, #0088ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🚘 HybridParts.mn
          </h1>
          <p style={{ margin: 0, fontSize: 11, color: "#556" }}>Toyota Prius & Aqua сэлбэг • Хятад & Тайвань</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setView("cart")} style={{ position: "relative", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, padding: "10px 16px", color: "#fff", cursor: "pointer", fontSize: 16 }}>
            🛒
            {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#ff4466", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "2px 6px", minWidth: 16, textAlign: "center" }}>{cartCount}</span>}
          </button>
          <button onClick={() => setView("admin-login")} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, padding: "10px 14px", color: "#556", cursor: "pointer", fontSize: 14 }}>⚙️</button>
        </div>
      </div>
    </div>
  );

  // ─── ADMIN ───
  if (view === "admin-login") return (
    <div style={containerStyle}>
      <Header />
      <AdminLogin onLogin={() => setView("admin")} />
    </div>
  );
  if (view === "admin") return (
    <div style={containerStyle}>
      <Header />
      <AdminPanel products={products} setProducts={updateProducts} orders={orders} onBack={() => setView("store")} />
    </div>
  );

  // ─── ORDER SUCCESS ───
  if (view === "order-success" && lastOrder) return (
    <div style={containerStyle}>
      <Header />
      <div style={{ padding: 20, textAlign: "center", maxWidth: 450, margin: "40px auto" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
        <h2 style={{ color: "#00d4aa", marginBottom: 8 }}>Захиалга амжилттай!</h2>
        <p style={{ color: "#8888aa", marginBottom: 20 }}>Захиалгын дугаар: <strong style={{ color: "#fff" }}>{lastOrder.id}</strong></p>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 20, textAlign: "left", border: "1px solid #2a2a4a" }}>
          {lastOrder.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1a2a3a", color: "#ccc", fontSize: 13 }}>
              <span>{item.name} × {item.qty}</span>
              <span style={{ color: "#00d4aa" }}>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", color: "#fff", fontWeight: 700, fontSize: 16 }}>
            <span>Нийт:</span><span style={{ color: "#00d4aa" }}>{formatPrice(lastOrder.total)}</span>
          </div>
        </div>
        <div style={{ background: "#1a2a1a", borderRadius: 12, padding: 16, marginTop: 16, border: "1px solid #2a4a2a" }}>
          <p style={{ color: "#00d4aa", fontSize: 14, margin: 0 }}>💳 QPay-ээр төлбөрөө шилжүүлнэ үү</p>
          <p style={{ color: "#8888aa", fontSize: 12, margin: "8px 0 0" }}>Бид таны захиалгыг баталгаажуулж, 24 цагийн дотор холбогдоно.</p>
        </div>
        <button onClick={() => setView("store")} style={{ marginTop: 20, padding: "12px 32px", background: "linear-gradient(135deg, #00d4aa, #0088ff)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          🏠 Дэлгүүр рүү буцах
        </button>
      </div>
    </div>
  );

  // ─── CART ───
  if (view === "cart") return (
    <div style={containerStyle}>
      <Header />
      <div style={{ padding: 20 }}>
        <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 16 }}>🛒 Сагс ({cartCount})</h2>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
            <p>Сагс хоосон байна</p>
            <button onClick={() => setView("store")} style={{ marginTop: 12, padding: "10px 24px", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, color: "#00d4aa", cursor: "pointer", fontSize: 13 }}>Дэлгүүр рүү буцах</button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginBottom: 10, border: "1px solid #2a2a4a", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <p style={{ margin: 0, color: "#eee", fontSize: 14 }}>{item.image} {item.name}</p>
                  <p style={{ margin: "4px 0 0", color: "#00d4aa", fontWeight: 600 }}>{formatPrice(item.price)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 30, height: 30, background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 16 }}>-</button>
                  <span style={{ color: "#fff", minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, Math.min(item.qty + 1, item.stock))} style={{ width: 30, height: 30, background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 16 }}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ff4466", cursor: "pointer", fontSize: 16, marginLeft: 4 }}>🗑</button>
                </div>
                <div style={{ color: "#fff", fontWeight: 600, minWidth: 100, textAlign: "right" }}>{formatPrice(item.price * item.qty)}</div>
              </div>
            ))}
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 20, marginTop: 16, border: "1px solid #00d4aa33" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                <span>Нийт дүн:</span><span style={{ color: "#00d4aa" }}>{formatPrice(cartTotal)}</span>
              </div>
              <button onClick={() => setView("checkout")} style={{ width: "100%", padding: "14px 0", background: "linear-gradient(135deg, #00d4aa, #0088ff)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                📦 Захиалга өгөх
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ─── CHECKOUT ───
  if (view === "checkout") return (
    <div style={containerStyle}>
      <Header />
      <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
        <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>📦 Захиалгын мэдээлэл</h2>
        {[
          { key: "name", label: "Нэр", placeholder: "Таны нэр", type: "text" },
          { key: "phone", label: "Утасны дугаар", placeholder: "99112233", type: "tel" },
          { key: "address", label: "Хаяг", placeholder: "Хүргэлтийн хаяг", type: "text" },
          { key: "note", label: "Нэмэлт тэмдэглэл", placeholder: "Хүсэлт, тайлбар...", type: "text" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <label style={{ color: "#8888aa", fontSize: 12, marginBottom: 6, display: "block" }}>{f.label}</label>
            <input
              type={f.type}
              value={checkoutForm[f.key]}
              onChange={e => setCheckoutForm({ ...checkoutForm, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              style={{ width: "100%", padding: "12px 16px", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
            />
          </div>
        ))}
        <div style={{ background: "#1a2a1a", borderRadius: 10, padding: 16, marginBottom: 20, border: "1px solid #2a4a2a" }}>
          <p style={{ margin: 0, color: "#00d4aa", fontSize: 14, fontWeight: 600 }}>💳 QPay төлбөрийн систем</p>
          <p style={{ margin: "6px 0 0", color: "#8888aa", fontSize: 12 }}>Захиалга баталгаажсаны дараа QPay-ээр төлбөр хийх заавар илгээнэ.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #2a2a4a", marginBottom: 16 }}>
          <span style={{ color: "#8888aa" }}>Нийт дүн:</span>
          <span style={{ color: "#00d4aa", fontWeight: 700, fontSize: 18 }}>{formatPrice(cartTotal)}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setView("cart")} style={{ flex: 1, padding: "14px 0", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, color: "#8888aa", cursor: "pointer", fontSize: 14 }}>← Буцах</button>
          <button
            onClick={placeOrder}
            disabled={!checkoutForm.name || !checkoutForm.phone}
            style={{ flex: 2, padding: "14px 0", background: checkoutForm.name && checkoutForm.phone ? "linear-gradient(135deg, #00d4aa, #0088ff)" : "#333", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 15, cursor: checkoutForm.name && checkoutForm.phone ? "pointer" : "default" }}
          >
            ✅ Захиалга баталгаажуулах
          </button>
        </div>
      </div>
    </div>
  );

  // ─── STORE (main) ───
  return (
    <div style={containerStyle}>
      <Header />
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0a1628, #1a0a28)", padding: "28px 20px", textAlign: "center", borderBottom: "1px solid #1a2a3a" }}>
        <h2 style={{ margin: 0, fontSize: 22, color: "#fff", fontWeight: 700 }}>Toyota Prius & Aqua сэлбэг</h2>
        <p style={{ margin: "6px 0 0", color: "#8888aa", fontSize: 13 }}>Хятад & Тайвань | Хамгийн хямд үнэ | Өргөн сонголт</p>
      </div>

      {/* Filters */}
      <div style={{ padding: "16px 20px", background: "#111122", borderBottom: "1px solid #1a1a2e" }}>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Сэлбэг хайх..."
          style={{ width: "100%", padding: "12px 16px", background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 10, color: "#fff", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
        />
        {/* Car filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {[["all", "Бүгд"], ["prius", "🔵 Prius"], ["aqua", "🟢 Aqua"]].map(([k, l]) => (
            <button key={k} onClick={() => setCarFilter(k)} style={{ padding: "8px 16px", background: carFilter === k ? (k === "prius" ? "#0044aa" : k === "aqua" ? "#007744" : "#00d4aa") : "#1a1a2e", color: carFilter === k ? "#fff" : "#8888aa", border: carFilter === k ? "none" : "1px solid #2a2a4a", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{l}</button>
          ))}
        </div>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCatFilter(c.id)} style={{ padding: "6px 12px", background: catFilter === c.id ? "#2a2a4a" : "transparent", color: catFilter === c.id ? "#00d4aa" : "#666", border: "1px solid #2a2a4a", borderRadius: 16, cursor: "pointer", fontSize: 11 }}>{c.icon} {c.name}</button>
          ))}
        </div>
        {/* Origin + Sort */}
        <div style={{ display: "flex", gap: 8 }}>
          <select value={originFilter} onChange={e => setOriginFilter(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 8, color: "#8888aa", fontSize: 12 }}>
            <option value="all">🌍 Бүх гарал</option>
            <option value="Хятад">🇨🇳 Хятад</option>
            <option value="Тайвань">🇹🇼 Тайвань</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 8, color: "#8888aa", fontSize: 12 }}>
            <option value="default">Эрэмбэлэх</option>
            <option value="price-asc">Үнэ ↑ Хямдаас</option>
            <option value="price-desc">Үнэ ↓ Үнэтэйгээс</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div style={{ padding: "10px 20px", color: "#556", fontSize: 12 }}>
        {filtered.length} бараа олдлоо
      </div>

      {/* Products Grid */}
      <div style={{ padding: "0 20px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {filtered.map(p => {
          const inCart = cart.find(c => c.id === p.id);
          return (
            <div key={p.id} style={{ background: "#1a1a2e", borderRadius: 14, padding: 16, border: "1px solid #2a2a4a", display: "flex", flexDirection: "column", transition: "border 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{p.image}</span>
                <span style={{ background: p.origin === "Тайвань" ? "#1a3a2a" : "#1a2a3a", color: p.origin === "Тайвань" ? "#00d4aa" : "#4488ff", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{p.origin}</span>
              </div>
              <p style={{ margin: "0 0 4px", color: "#eee", fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{p.name}</p>
              <p style={{ margin: "0 0 8px", color: "#666", fontSize: 11 }}>{p.desc}</p>
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color: "#00d4aa", fontWeight: 700, fontSize: 16 }}>{formatPrice(p.price)}</span>
                  <span style={{ color: p.stock < 5 ? "#ff4466" : "#556", fontSize: 11 }}>{p.stock > 0 ? `${p.stock} ширхэг` : "Дууссан"}</span>
                </div>
                <button
                  onClick={() => p.stock > 0 && addToCart(p)}
                  disabled={p.stock === 0}
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    background: p.stock === 0 ? "#333" : inCart ? "#0a3a2a" : "linear-gradient(135deg, #00d4aa, #0088ff)",
                    border: inCart ? "1px solid #00d4aa44" : "none",
                    borderRadius: 8,
                    color: p.stock === 0 ? "#666" : "#fff",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: p.stock > 0 ? "pointer" : "default",
                  }}
                >
                  {p.stock === 0 ? "Дууссан" : inCart ? `✓ Сагсанд (${inCart.qty})` : "🛒 Сагсанд нэмэх"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
          <p>Хайлтад тохирох бараа олдсонгүй</p>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "20px", textAlign: "center", borderTop: "1px solid #1a1a2e", color: "#333", fontSize: 11 }}>
        <p>© 2026 HybridParts.mn | Toyota Prius & Aqua сэлбэг</p>
        <p>📞 Утас: 9911-2233 | 📍 УБ хот</p>
      </div>
    </div>
  );
}
