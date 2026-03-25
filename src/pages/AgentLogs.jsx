import { useState } from "react";
import { ScrollText, RefreshCw, Search, Filter, Download, Circle } from "lucide-react";

const LEVELS = { INFO:"text-blue-400 bg-blue-500/10", WARN:"text-amber-400 bg-amber-500/10", ERROR:"text-red-400 bg-red-500/10", DEBUG:"text-muted-foreground bg-muted", SUCCESS:"text-emerald-400 bg-emerald-500/10" };
const SAMPLE_LOGS = [
  { ts:"18:34:22", level:"INFO",    service:"getSreeHealth",      msg:"Health check OK — all systems nominal" },
  { ts:"18:33:10", level:"INFO",    service:"postCallLearning",   msg:"Processed 3 call records, updated KB" },
  { ts:"18:31:55", level:"WARN",    service:"twilioWebhook",      msg:"Response time 1200ms — threshold 800ms" },
  { ts:"18:30:02", level:"INFO",    service:"marketingHub",       msg:"Campaign dispatched to 142 contacts via SendGrid" },
  { ts:"18:28:44", level:"SUCCESS", service:"githubSync",         msg:"ZoaZone/sree-os — 14 files pushed successfully" },
  { ts:"18:27:33", level:"INFO",    service:"aevaChat",           msg:"OpenAI gpt-4o-mini response in 380ms" },
  { ts:"18:26:11", level:"DEBUG",   service:"kbRetrieval",        msg:"Query matched 4 chunks, score 0.87" },
  { ts:"18:25:00", level:"ERROR",   service:"stripeWebhook",      msg:"422 Unprocessable Entity — invalid event type" },
  { ts:"18:24:10", service:"websiteScraper", level:"INFO",        msg:"Scanned aevoice.ai — 12 pages indexed" },
  { ts:"18:22:55", level:"INFO",    service:"ttsStream",          msg:"Synthesized 42 chars in 180ms — ElevenLabs" },
  { ts:"18:21:33", level:"SUCCESS", service:"onboarding",         msg:"New client onboarded — welcome email sent" },
  { ts:"18:20:00", level:"DEBUG",   service:"planLimits",         msg:"User aevoiceai@gmail.com — Aeva Mega plan, 960/1000 min used" },
];

export default function AgentLogs() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [logs, setLogs] = useState(SAMPLE_LOGS);

  const filtered = logs.filter(l => {
    const mS = !search || l.msg.toLowerCase().includes(search.toLowerCase()) || l.service.toLowerCase().includes(search.toLowerCase());
    const mL = levelFilter==="ALL" || l.level===levelFilter;
    return mS && mL;
  });

  const refresh = () => {
    const newLog = { ts:new Date().toTimeString().slice(0,8), level:"INFO", service:"sree-os", msg:"Manual refresh triggered — fetching latest logs" };
    setLogs(l=>[newLog,...l]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><ScrollText className="w-6 h-6 text-blue-400"/>Agent Logs</h1>
        <div className="flex gap-2">
          <button onClick={refresh} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted/20 text-muted-foreground hover:text-foreground">
            <RefreshCw className="w-3.5 h-3.5"/>Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted/20 text-muted-foreground hover:text-foreground">
            <Download className="w-3.5 h-3.5"/>Export
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search logs…" className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"/>
        </div>
        <div className="flex gap-1.5">
          {["ALL","INFO","WARN","ERROR","DEBUG","SUCCESS"].map(l=>(
            <button key={l} onClick={()=>setLevelFilter(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${levelFilter===l?"bg-purple-500/15 text-purple-400 border border-purple-500/20":"bg-muted text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="bg-[#050505] border border-border rounded-2xl overflow-hidden font-mono">
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card/50 text-xs text-muted-foreground">
          <span className="w-16">Time</span><span className="w-16">Level</span><span className="w-36">Service</span><span>Message</span>
        </div>
        <div className="divide-y divide-border/50 max-h-[500px] overflow-y-auto">
          {filtered.map((log, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/[0.02] text-xs font-mono">
              <span className="text-muted-foreground/60 w-16 flex-shrink-0">{log.ts}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold w-16 flex-shrink-0 text-center ${LEVELS[log.level]||"bg-muted text-muted-foreground"}`}>{log.level}</span>
              <span className="text-purple-400/70 w-36 flex-shrink-0 truncate">{log.service}</span>
              <span className="text-green-400/80 flex-1">{log.msg}</span>
            </div>
          ))}
          {filtered.length===0&&<div className="text-center py-8 text-muted-foreground text-sm">No logs match filters</div>}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">Showing {filtered.length} of {logs.length} log entries</p>
    </div>
  );
}
