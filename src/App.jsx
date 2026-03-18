import React, { useState, useEffect, useCallback } from 'react';
import {
  Building2, Home, CreditCard, Bell, Wrench, BarChart3, User, LogOut, ChevronRight,
  ChevronLeft, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, XCircle,
  Plus, Search, Menu, X, Settings, Users, DollarSign, TrendingUp, Calendar,
  Shield, Car, Hash, ArrowRight, Eye, EyeOff, Loader2
} from 'lucide-react';
import * as api from './api/client';

/* ─── helpers ─── */
const fmt = (n) => n?.toLocaleString('mn-MN') + '₮';
const statusColors = { open: 'bg-yellow-100 text-yellow-800', progress: 'bg-blue-100 text-blue-800', done: 'bg-green-100 text-green-800' };
const statusLabels = { open: 'Нээлттэй', progress: 'Шийдвэрлэж байна', done: 'Шийдсэн' };

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [building, setBuilding] = useState(null);
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedBuilding = localStorage.getItem('building');
    if (token) {
      api.getMe()
        .then(u => {
          setUser(u);
          if (u.building && savedBuilding) {
            setBuilding(JSON.parse(savedBuilding));
          } else if (u.building) {
            api.fetchBuildingById(u.building).then(b => {
              setBuilding(b);
              localStorage.setItem('building', JSON.stringify(b));
            });
          }
        })
        .catch(() => { api.setToken(null); localStorage.removeItem('building'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    api.setToken(null);
    localStorage.removeItem('building');
    setUser(null);
    setBuilding(null);
    setPage('home');
  };

  const handleLogin = (u, b) => {
    setUser(u);
    setBuilding(b);
    localStorage.setItem('building', JSON.stringify(b));
    setPage('home');
  };

  if (loading) return <SplashScreen />;
  if (!user) return <AuthFlow onLogin={handleLogin} />;

  const nav = [
    { id: 'home', label: 'Нүүр', icon: Home },
    { id: 'payments', label: 'Төлбөр', icon: CreditCard },
    { id: 'announcements', label: 'Мэдэгдэл', icon: Bell },
    { id: 'requests', label: 'Хүсэлт', icon: Wrench },
    { id: 'expenses', label: 'Зарлага', icon: BarChart3 },
    { id: 'profile', label: 'Профайл', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-1" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Building2 size={24} className="text-blue-600" />
            <span className="font-semibold text-sm truncate max-w-[180px]">{building?.name || 'СӨХ'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline">{user.name}</span>
            {user.isAdmin && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Админ</span>}
            <button onClick={handleLogout} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Гарах">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileMenu && (
        <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setMobileMenu(false)}>
          <div className="bg-white w-64 h-full shadow-xl p-4" onClick={e => e.stopPropagation()}>
            <div className="mb-6">
              <h3 className="font-semibold text-lg">{building?.name}</h3>
              <p className="text-xs text-gray-500">{building?.district}, {building?.khoroo}</p>
            </div>
            {nav.map(n => (
              <button key={n.id} onClick={() => { setPage(n.id); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm ${page === n.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                <n.icon size={18} />
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex max-w-5xl mx-auto w-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 bg-white border-r p-3 space-y-1">
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${page === n.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <n.icon size={18} />
              {n.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
          {page === 'home' && <HomePage user={user} building={building} />}
          {page === 'payments' && <PaymentsPage user={user} building={building} />}
          {page === 'announcements' && <AnnouncementsPage user={user} building={building} />}
          {page === 'requests' && <RequestsPage user={user} building={building} />}
          {page === 'expenses' && <ExpensesPage building={building} />}
          {page === 'profile' && <ProfilePage user={user} building={building} onLogout={handleLogout} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-20">
        <div className="flex justify-around py-1">
          {nav.slice(0, 5).map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`flex flex-col items-center py-1 px-2 text-xs ${page === n.id ? 'text-blue-600' : 'text-gray-400'}`}>
              <n.icon size={20} />
              <span className="mt-0.5">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */
function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <Building2 size={64} className="mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold">СӨХ</h1>
        <p className="text-blue-200 text-sm mt-1">Сууц Өмчлөгчдийн Холбоо</p>
        <Loader2 size={24} className="mx-auto mt-6 animate-spin text-blue-300" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH FLOW  (Location → Building → Login/Register)
   ═══════════════════════════════════════════════════════════════════════════ */
function AuthFlow({ onLogin }) {
  const [step, setStep] = useState('welcome'); // welcome, city, district, khoroo, building, login, register
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [khoroo, setKhoroo] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [khoroos, setKhoroos] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regUnit, setRegUnit] = useState('');
  const [regBlock, setRegBlock] = useState('A');

  const loadCities = async () => {
    setLoading(true);
    try {
      const data = await api.fetchLocations();
      setCities(data.cities || []);
      setStep('city');
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const selectCity = async (c) => {
    setCity(c);
    setLoading(true);
    try {
      const data = await api.fetchLocations(`city=${encodeURIComponent(c)}`);
      setDistricts(data.districts || []);
      setStep('district');
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const selectDistrict = async (d) => {
    setDistrict(d);
    setLoading(true);
    try {
      const data = await api.fetchLocations(`city=${encodeURIComponent(city)}&district=${encodeURIComponent(d)}`);
      setKhoroos(data.khoroos || []);
      setStep('khoroo');
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const selectKhoroo = async (k) => {
    setKhoroo(k);
    setLoading(true);
    try {
      const data = await api.fetchBuildings(`city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}&khoroo=${encodeURIComponent(k)}`);
      setBuildings(data || []);
      setStep('building');
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const selectBuilding = (b) => {
    setSelectedBuilding(b);
    setStep('login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      api.setToken(data.token);
      onLogin(data.user, selectedBuilding);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.register({
        name: regName, email: regEmail, password: regPassword,
        phone: regPhone, unit: Number(regUnit) || 0, block: regBlock,
        building: selectedBuilding?._id,
      });
      api.setToken(data.token);
      onLogin(data.user, selectedBuilding);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const goBack = () => {
    if (step === 'register') setStep('login');
    else if (step === 'login') setStep('building');
    else if (step === 'building') setStep('khoroo');
    else if (step === 'khoroo') setStep('district');
    else if (step === 'district') setStep('city');
    else if (step === 'city') setStep('welcome');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Building2 size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">СӨХ</h1>
            <p className="text-blue-200 mb-1">Сууц Өмчлөгчдийн Холбоо</p>
            <p className="text-blue-300 text-sm mb-8">Нэгдсэн удирдлагын систем</p>
            <button onClick={loadCities} disabled={loading}
              className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
              {loading ? <Loader2 size={20} className="animate-spin" /> : <>Эхлэх <ArrowRight size={18} /></>}
            </button>
            <p className="text-blue-300 text-xs mt-4">Хот, дүүрэг, хороогоор бүртгүүлнэ</p>
          </div>
        )}

        {/* Location Steps */}
        {['city', 'district', 'khoroo', 'building'].includes(step) && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-5 py-4 text-white">
              <button onClick={goBack} className="flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-2">
                <ChevronLeft size={16} /> Буцах
              </button>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={20} />
                {step === 'city' && 'Хот сонгох'}
                {step === 'district' && 'Дүүрэг сонгох'}
                {step === 'khoroo' && 'Хороо сонгох'}
                {step === 'building' && 'Байр сонгох'}
              </h2>
              {step !== 'city' && (
                <p className="text-blue-200 text-xs mt-1">
                  {city}{district ? ` → ${district}` : ''}{khoroo ? ` → ${khoroo}` : ''}
                </p>
              )}
            </div>
            <div className="p-4">
              {loading ? (
                <div className="py-12 text-center"><Loader2 size={28} className="animate-spin mx-auto text-blue-500" /></div>
              ) : (
                <div className="space-y-2">
                  {step === 'city' && cities.map(c => (
                    <LocationCard key={c} label={c} sub="Хот/Аймаг" onClick={() => selectCity(c)} />
                  ))}
                  {step === 'district' && districts.map(d => (
                    <LocationCard key={d} label={d} sub="Дүүрэг/Сум" onClick={() => selectDistrict(d)} />
                  ))}
                  {step === 'khoroo' && khoroos.map(k => (
                    <LocationCard key={k} label={k} sub="Хороо/Баг" onClick={() => selectKhoroo(k)} />
                  ))}
                  {step === 'building' && buildings.map(b => (
                    <button key={b._id} onClick={() => selectBuilding(b)}
                      className="w-full flex items-center gap-3 p-3 border rounded-xl hover:bg-blue-50 hover:border-blue-300 transition text-left">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: b.color }}>
                        {b.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.address} • {b.totalUnits} айл</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  ))}
                  {((step === 'city' && cities.length === 0) || (step === 'district' && districts.length === 0) ||
                    (step === 'khoroo' && khoroos.length === 0) || (step === 'building' && buildings.length === 0)) && (
                    <p className="text-center text-gray-400 py-8 text-sm">Мэдээлэл олдсонгүй</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Login */}
        {step === 'login' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-5 py-4 text-white">
              <button onClick={goBack} className="flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-2">
                <ChevronLeft size={16} /> Буцах
              </button>
              <h2 className="text-lg font-semibold">Нэвтрэх</h2>
              <p className="text-blue-200 text-xs mt-0.5">{selectedBuilding?.name}</p>
            </div>
            <form onSubmit={handleLogin} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имэйл</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Нууц үг</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="••••••" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Нэвтрэх'}
              </button>
              <p className="text-center text-sm text-gray-500">
                Бүртгэлгүй юу? <button type="button" onClick={() => { setStep('register'); setError(''); }} className="text-blue-600 font-medium">Бүртгүүлэх</button>
              </p>
            </form>
          </div>
        )}

        {/* Register */}
        {step === 'register' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-5 py-4 text-white">
              <button onClick={goBack} className="flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-2">
                <ChevronLeft size={16} /> Буцах
              </button>
              <h2 className="text-lg font-semibold">Бүртгүүлэх</h2>
              <p className="text-blue-200 text-xs mt-0.5">{selectedBuilding?.name}</p>
            </div>
            <form onSubmit={handleRegister} className="p-5 space-y-3">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Нэр *</label>
                <input value={regName} onChange={e => setRegName(e.target.value)} required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Таны нэр" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Имэйл *</label>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Утас</label>
                <input value={regPhone} onChange={e => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="99112233" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Тоот</label>
                  <input type="number" value={regUnit} onChange={e => setRegUnit(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="45" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Блок</label>
                  <select value={regBlock} onChange={e => setRegBlock(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    {(selectedBuilding?.blocks || 'A, B').split(',').map(bl => (
                      <option key={bl.trim()} value={bl.trim()}>{bl.trim()}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Нууц үг *</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength={6}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="6+ тэмдэгт" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-2">
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Бүртгүүлэх'}
              </button>
              <p className="text-center text-sm text-gray-500">
                Бүртгэлтэй юу? <button type="button" onClick={() => { setStep('login'); setError(''); }} className="text-blue-600 font-medium">Нэвтрэх</button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function LocationCard({ label, sub, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-between p-3 border rounded-xl hover:bg-blue-50 hover:border-blue-300 transition text-left">
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function HomePage({ user, building }) {
  const [payments, setPayments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.fetchPayments(user.unit ? `unit=${user.unit}&block=${user.block || 'A'}` : '').catch(() => []),
      api.fetchAnnouncements().catch(() => []),
      api.fetchRequests(user.unit ? `unit=${user.unit}` : '').catch(() => []),
    ]).then(([p, a, r]) => {
      setPayments(p);
      setAnnouncements(a);
      setRequests(r);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <PageLoader />;

  const unpaid = payments.filter(p => !p.paid);
  const totalDebt = unpaid.reduce((s, p) => s + p.amount, 0);
  const openRequests = requests.filter(r => r.status !== 'done').length;

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
        <p className="text-blue-200 text-sm">Сайн байна уу,</p>
        <h2 className="text-xl font-bold mt-0.5">{user.name}</h2>
        <div className="flex items-center gap-2 mt-2 text-blue-200 text-xs">
          <MapPin size={14} />
          <span>{building?.district}, {building?.khoroo} • {building?.address}</span>
        </div>
        {user.unit > 0 && (
          <div className="mt-3 flex gap-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Блок {user.block}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Тоот {user.unit}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={DollarSign} label="Төлөгдөөгүй" value={fmt(totalDebt)} color={totalDebt > 0 ? 'red' : 'green'} />
        <StatCard icon={CreditCard} label="Сарын төлбөр" value={fmt(building?.monthlyFee || 0)} color="blue" />
        <StatCard icon={Wrench} label="Нээлттэй хүсэлт" value={openRequests} color="yellow" />
        <StatCard icon={Bell} label="Мэдэгдэл" value={announcements.length} color="purple" />
      </div>

      {/* Unpaid payments */}
      {unpaid.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm text-gray-800 mb-2">Төлөгдөөгүй төлбөр</h3>
          <div className="space-y-2">
            {unpaid.slice(0, 3).map(p => (
              <div key={p._id} className="bg-white border border-red-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-gray-500">{p.month}</p>
                </div>
                <span className="text-red-600 font-semibold text-sm">{fmt(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent announcements */}
      {announcements.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm text-gray-800 mb-2">Сүүлийн мэдэгдлүүд</h3>
          <div className="space-y-2">
            {announcements.slice(0, 3).map(a => (
              <div key={a._id} className={`bg-white rounded-xl p-3 border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.date}</p>
                  </div>
                  {a.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Яаралтай</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Building info */}
      <div className="bg-white rounded-2xl border p-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">Байрны мэдээлэл</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoRow icon={Building2} label="Нэр" value={building?.name} />
          <InfoRow icon={MapPin} label="Хаяг" value={`${building?.district}, ${building?.khoroo}`} />
          <InfoRow icon={Users} label="Нийт айл" value={building?.totalUnits} />
          <InfoRow icon={TrendingUp} label="Давхар" value={building?.floors} />
          <InfoRow icon={Phone} label="Утас" value={building?.phone} />
          <InfoRow icon={Mail} label="Имэйл" value={building?.email} />
        </div>
        {building?.bankName && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-gray-500 mb-1">Дансны мэдээлэл</p>
            <p className="text-sm font-medium">{building?.bankName} • {building?.accountNo}</p>
            <p className="text-xs text-gray-500">{building?.accountHolder}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    red: 'bg-red-50 text-red-600 border-red-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };
  return (
    <div className={`rounded-xl border p-3 ${colors[color]}`}>
      <Icon size={18} className="mb-1" />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-gray-400 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm truncate">{value || '-'}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAYMENTS PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function PaymentsPage({ user, building }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unpaid, paid

  useEffect(() => {
    const params = user.unit ? `unit=${user.unit}&block=${user.block || 'A'}` : '';
    api.fetchPayments(params).then(setPayments).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <PageLoader />;

  const filtered = filter === 'all' ? payments : payments.filter(p => filter === 'paid' ? p.paid : !p.paid);
  const totalUnpaid = payments.filter(p => !p.paid).reduce((s, p) => s + p.amount, 0);
  const totalPaid = payments.filter(p => p.paid).reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Төлбөрийн мэдээлэл</h2>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50 border border-red-100 rounded-xl p-3">
          <p className="text-xs text-red-500">Төлөгдөөгүй</p>
          <p className="text-lg font-bold text-red-600">{fmt(totalUnpaid)}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
          <p className="text-xs text-green-500">Төлөгдсөн</p>
          <p className="text-lg font-bold text-green-600">{fmt(totalPaid)}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[['all', 'Бүгд'], ['unpaid', 'Төлөгдөөгүй'], ['paid', 'Төлөгдсөн']].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Payment list */}
      <div className="space-y-2">
        {filtered.map(p => (
          <div key={p._id} className={`bg-white rounded-xl border p-4 ${!p.paid ? 'border-red-100' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.paid ? 'bg-green-100' : 'bg-red-100'}`}>
                  {p.paid ? <CheckCircle2 size={18} className="text-green-600" /> : <Clock size={18} className="text-red-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-gray-500">{p.month} • Блок {p.block}, Тоот {p.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${p.paid ? 'text-green-600' : 'text-red-600'}`}>{fmt(p.amount)}</p>
                {p.paid && p.paidDate && <p className="text-xs text-gray-400">Төлсөн: {p.paidDate}</p>}
                {!p.paid && <span className="text-xs text-red-500">Төлөгдөөгүй</span>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">Төлбөр олдсонгүй</p>}
      </div>

      {/* Bank info */}
      {building?.bankName && (
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
          <p className="text-xs text-blue-500 font-medium mb-1">Төлбөр төлөх данс</p>
          <p className="text-sm font-semibold text-blue-800">{building.bankName}</p>
          <p className="text-sm text-blue-700">{building.accountNo}</p>
          <p className="text-xs text-blue-500 mt-0.5">{building.accountHolder}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANNOUNCEMENTS PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function AnnouncementsPage({ user, building }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const [icon, setIcon] = useState('📢');
  const [urgent, setUrgent] = useState(false);

  const load = useCallback(() => {
    api.fetchAnnouncements().then(setAnnouncements).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.createAnnouncement({ text, icon, urgent, date: new Date().toISOString().slice(0, 10).replace(/-/g, '.') });
      setText(''); setUrgent(false); setShowForm(false);
      load();
    } catch {}
  };

  const handleDelete = async (id) => {
    try { await api.deleteAnnouncement(id); load(); } catch {}
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Мэдэгдлүүд</h2>
        {user.isAdmin && (
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Нэмэх
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border p-4 space-y-3">
          <div className="flex gap-2">
            <select value={icon} onChange={e => setIcon(e.target.value)}
              className="border rounded-lg px-2 py-2 text-lg bg-white">
              {['📢', '💧', '⚡', '🔧', '🏢', '🚗', '🔔', '⚠️'].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <input value={text} onChange={e => setText(e.target.value)} required
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Мэдэгдлийн текст..." />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)} className="rounded" />
              Яаралтай
            </label>
            <button type="submit" className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700">Нийтлэх</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {announcements.map(a => (
          <div key={a._id} className={`bg-white rounded-xl border p-4 ${a.urgent ? 'border-red-200 bg-red-50/50' : 'border-gray-100'}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm">{a.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">{a.date}</span>
                  {a.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Яаралтай</span>}
                </div>
              </div>
              {user.isAdmin && (
                <button onClick={() => handleDelete(a._id)} className="text-gray-400 hover:text-red-500 p-1">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        {announcements.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">Мэдэгдэл байхгүй</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   REQUESTS PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function RequestsPage({ user, building }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cat, setCat] = useState('Лифт');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const load = useCallback(() => {
    const params = user.isAdmin ? '' : (user.unit ? `unit=${user.unit}` : '');
    api.fetchRequests(params).then(setRequests).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.createRequest({ unit: user.unit || 0, block: user.block || 'A', cat, title, desc });
      setTitle(''); setDesc(''); setShowForm(false);
      load();
    } catch {}
  };

  const handleStatusChange = async (id, status) => {
    try { await api.updateRequest(id, { status }); load(); } catch {}
  };

  if (loading) return <PageLoader />;

  const categories = ['Лифт', 'Ус', 'Цахилгаан', 'Цэвэрлэгээ', 'Дулаан', 'Хаалга', 'Бусад'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Засварын хүсэлт</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
          <Plus size={14} /> Шинэ хүсэлт
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Төрөл</label>
            <select value={cat} onChange={e => setCat(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Гарчиг</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Хүсэлтийн гарчиг" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Тайлбар</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Дэлгэрэнгүй тайлбар..." />
          </div>
          <button type="submit" className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700">Илгээх</button>
        </form>
      )}

      {/* Stats */}
      <div className="flex gap-2">
        {[['open', 'Нээлттэй'], ['progress', 'Шийдвэрлэж байна'], ['done', 'Шийдсэн']].map(([key, label]) => {
          const count = requests.filter(r => r.status === key).length;
          return (
            <div key={key} className={`flex-1 rounded-lg p-2 text-center ${statusColors[key]}`}>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Request list */}
      <div className="space-y-2">
        {requests.map(r => (
          <div key={r._id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>{statusLabels[r.status]}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{r.cat}</span>
                </div>
                <p className="text-sm font-medium">{r.title}</p>
                {r.desc && <p className="text-xs text-gray-500 mt-1">{r.desc}</p>}
                <p className="text-xs text-gray-400 mt-2">Тоот {r.unit} ({r.block}) • {r.date}</p>
              </div>
              {user.isAdmin && r.status !== 'done' && (
                <div className="flex gap-1 ml-2">
                  {r.status === 'open' && (
                    <button onClick={() => handleStatusChange(r._id, 'progress')}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-200">Хүлээн авах</button>
                  )}
                  <button onClick={() => handleStatusChange(r._id, 'done')}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200">Шийдсэн</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {requests.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">Хүсэлт байхгүй</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPENSES PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function ExpensesPage({ building }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchExpenses().then(setExpenses).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const maxAmount = Math.max(...expenses.map(e => e.amount), 1);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Зарлагын тайлан</h2>

      {/* Total */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-5 text-white">
        <p className="text-purple-200 text-xs">Нийт зарлага</p>
        <p className="text-2xl font-bold mt-1">{fmt(total)}</p>
        <p className="text-purple-200 text-xs mt-1">Энэ сарын зарлагын дүн</p>
      </div>

      {/* Chart-like bars */}
      <div className="bg-white rounded-xl border p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Зарлагын задаргаа</h3>
        {expenses.map(e => (
          <div key={e._id} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span>{e.icon}</span>
                <span>{e.label}</span>
              </span>
              <span className="font-medium">{fmt(e.amount)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 rounded-full h-2 transition-all" style={{ width: `${(e.amount / maxAmount) * 100}%` }} />
            </div>
          </div>
        ))}
        {expenses.length === 0 && <p className="text-center text-gray-400 py-4 text-sm">Зарлага байхгүй</p>}
      </div>

      {/* List view */}
      <div className="space-y-2">
        {expenses.map(e => (
          <div key={e._id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{e.icon}</span>
              <div>
                <p className="text-sm font-medium">{e.label}</p>
                <p className="text-xs text-gray-400">{e.month}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800">{fmt(e.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROFILE PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function ProfilePage({ user, building, onLogout }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Миний мэдээлэл</h2>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
            {user.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.isAdmin && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Админ</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Утас</p>
            <p className="font-medium">{user.phone || '-'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Тоот</p>
            <p className="font-medium">{user.unit || '-'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Блок</p>
            <p className="font-medium">{user.block || '-'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Эрх</p>
            <p className="font-medium">{user.isAdmin ? 'Админ' : 'Оршин суугч'}</p>
          </div>
        </div>
      </div>

      {/* Building info */}
      <div className="bg-white rounded-2xl border p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Building2 size={16} /> Байрны мэдээлэл
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Нэр</span>
            <span className="font-medium">{building?.name}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Хот</span>
            <span className="font-medium">{building?.city}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Дүүрэг</span>
            <span className="font-medium">{building?.district}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Хороо</span>
            <span className="font-medium">{building?.khoroo}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Хаяг</span>
            <span className="font-medium">{building?.address}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Нийт айл</span>
            <span className="font-medium">{building?.totalUnits}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">Сарын төлбөр</span>
            <span className="font-medium text-blue-600">{fmt(building?.monthlyFee || 0)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500">Утас</span>
            <span className="font-medium">{building?.phone}</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium py-3 rounded-xl hover:bg-red-100 transition">
        <LogOut size={18} />
        Системээс гарах
      </button>
    </div>
  );
}

/* ─── Shared components ─── */
function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  );
}
