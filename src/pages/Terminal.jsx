import { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, ChevronRight } from "lucide-react";

const HISTORY_INIT = [
  { type:"system", text:"Sree OS Terminal v1.0 — type 'help' for available commands" },
  { type:"system", text:"Connected to AEVOICE infrastructure · Session secured" },
];

const COMMANDS = {
  help: () => ["Available commands:", "  health      — run system health check", "  agents      — list active agents", "  deploy      — trigger latest deployment", "  logs        — tail recent logs", "  clear       — clear terminal", "  whoami      — show current user context"],
  health: () => ["Running health check…", "  ✓ AEVOICE API     — 42ms", "  ✓ Sree Engine     — 18ms", "  ✓ GitHub Sync     — OK", "  ⚠ Twilio Webhook  — degraded (1.2s)", "Health check complete."],
  agents: () => ["Active agents:", "  [1] SriChat         — voice chatbot       running", "  [2] SreeDev         — developer agent    running", "  [3] MarketingHub   — content generator  running", "3 agents active."],
  deploy: () => ["Triggering deployment…", "  Pulling latest from ZoaZone/sree-os…", "  Building…", "  Deploying to os.aevoice.ai…", "  ✓ Deployed successfully"],
  logs: () => ["[INFO]  2026-03-25 18:30 getSreeHealth — OK", "[INFO]  2026-03-25 18:28 postCallLearning — 3 records processed", "[WARN]  2026-03-25 18:25 twilioWebhook — timeout 1200ms", "[INFO]  2026-03-25 18:20 marketingHub — campaign sent to 142 contacts"],
  whoami: () => ["User: admin@aevoice.ai", "Role: super-admin", "Session: os.aevoice.ai", "App: Sree OS (standalone)"],
  clear: () => null,
};

export default function Terminal() {
  const [history, setHistory] = useState(HISTORY_INIT);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    setCmdHistory(h => [trimmed, ...h]);
    setHistIdx(-1);
    setHistory(h => [...h, { type:"input", text:`$ ${trimmed}` }]);
    if (trimmed === "clear") { setHistory(HISTORY_INIT); return; }
    const fn = COMMANDS[trimmed];
    if (fn) {
      const out = fn();
      if (out) setHistory(h => [...h, ...out.map(t => ({ type:"output", text:t }))]);
    } else {
      setHistory(h => [...h, { type:"error", text:`Command not found: ${trimmed}. Type 'help' for help.` }]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") { const idx = Math.min(histIdx+1, cmdHistory.length-1); setHistIdx(idx); setInput(cmdHistory[idx]||""); }
    else if (e.key === "ArrowDown") { const idx = Math.max(histIdx-1, -1); setHistIdx(idx); setInput(idx===-1?"":cmdHistory[idx]||""); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><TermIcon className="w-6 h-6 text-purple-400"/>Terminal</h1>
      <div className="bg-[#050505] border border-border rounded-2xl overflow-hidden font-mono" onClick={()=>inputRef.current?.focus()}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/70"/><div className="w-3 h-3 rounded-full bg-amber-500/70"/><div className="w-3 h-3 rounded-full bg-emerald-500/70"/></div>
          <span className="text-xs text-muted-foreground ml-2">sree@os.aevoice.ai:~</span>
        </div>
        {/* Output */}
        <div className="p-4 h-96 overflow-y-auto space-y-1">
          {history.map((line, i) => (
            <div key={i} className={`text-sm leading-relaxed ${line.type==="input"?"text-purple-400":line.type==="error"?"text-red-400":line.type==="system"?"text-blue-400/70":"text-green-400/90"}`}>
              {line.text}
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
          <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0"/>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="type a command…" autoFocus
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none placeholder-muted-foreground/30 font-mono"/>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {["help","health","agents","logs","deploy"].map(cmd=>(
          <button key={cmd} onClick={()=>{run(cmd);}} className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-mono text-muted-foreground hover:text-purple-400 hover:border-purple-500/30 transition-all">
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
