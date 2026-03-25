import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      // Base44 auth will be wired here after app ID is configured
      // For now navigate to dashboard
      setTimeout(() => { navigate("/dashboard"); }, 800);
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 shadow-2xl shadow-purple-500/30">
            <Cpu className="w-7 h-7 text-white"/>
          </div>
          <h1 className="text-2xl font-black text-white">Sree OS</h1>
          <p className="text-white/40 text-sm mt-1">Agentic Developer Console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/50">Email</label>
            <input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}
              placeholder="you@aevoice.ai" required
              className="w-full h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-white/20"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/50">Password</label>
            <div className="relative">
              <input type={show?"text":"password"} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                placeholder="••••••••" required
                className="w-full h-10 px-4 pr-10 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-white/20"/>
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {show?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 mt-2">
            {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Signing in…</>:"Sign In to Sree OS"}
          </button>
        </form>
        <p className="text-center text-xs text-white/20 mt-6">os.aevoice.ai · Powered by AEVOICE</p>
      </div>
    </div>
  );
}
