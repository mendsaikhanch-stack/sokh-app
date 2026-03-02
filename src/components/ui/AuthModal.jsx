import { useState } from "react";
import { X } from "lucide-react";
import useApp from "../../hooks/useApp";

export default function AuthModal() {
  const { cd, inp, txS, t, setShowAuth, loginUser, registerUser, addToast } = useApp();
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (mode === "register" && !name)) return;
    setLoading(true);
    try {
      if (mode === "login") {
        await loginUser(email, password);
      } else {
        await registerUser(name, email, password);
      }
      setShowAuth(false);
    } catch (err) {
      addToast(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

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
        <h3 className="text-xl font-bold mb-4 text-amber-500">
          {mode === "login" ? t.login : (t.register || "Register")}
        </h3>
        {mode === "register" && (
          <input
            className={`w-full px-3 py-2 rounded-lg border mb-3 ${inp}`}
            placeholder={t.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={`w-full px-3 py-2 rounded-lg border mb-3 ${inp}`}
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`w-full px-3 py-2 rounded-lg border mb-4 ${inp}`}
          placeholder={t.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "..." : mode === "login" ? t.login : (t.register || "Register")}
        </button>
        <p
          className={`text-xs mt-3 ${txS} text-center cursor-pointer hover:text-amber-500`}
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? (t.noAccount || "Don't have an account? Register")
            : (t.hasAccount || "Already have an account? Login")}
        </p>
      </div>
    </div>
  );
}
