import { useState, useEffect } from "react";
import { Cpu, Zap, GitBranch, ScrollText, Activity, Clock, CheckCircle2, AlertCircle, Circle, TrendingUp } from "lucide-react";

const AGENT_TASKS = [
  { id:1, name:"Scan AEVOICE codebase", status:"done", time:"2 min ago", type:"code" },
  { id:2, name:"Generate marketing copy for cream.aevoice.ai", status:"done", time:"18 min ago", type:"content" },
  { id:3, name:"Debug stripeWebhook.ts — 422 error", status:"running", time:"just now", type:"debug" },
  { id:4, name:"Push 14 pages to ZoaZone/marketer", status:"done", time:"1 hr ago", type:"deploy" },
  { id:5, name:"Health check getSreeHealth function", status:"idle", time:"scheduled", type:"monitor" },
];

const STATUS_ICON = { done:<CheckCircle2 className="w-4 h-4 text-emerald-400"/>, running:<Activity className="w-4 h-4 text-purple-400 animate-pulse"/>, idle:<Circle className="w-4 h-4 text-muted-foreground"/>, error:<AlertCircle className="w-4 h-4 text-red-400"/> };
const STATUS_COLORS = { done:"bg-emerald-500/10 text-emerald-400", running:"bg-purple-500/10 text-purple-400", idle:"bg-muted text-muted-foreground", error:"bg-red-500/10 text-red-400" };
const TYPE_COLORS = { code:"bg-blue-500/10 text-blue-400", content:"bg-pink-500/10 text-pink-400", debug:"bg-amber-500/10 text-amber-400", deploy:"bg-indigo-500/10 text-indigo-400", monitor:"bg-teal-500/10 text-teal-400" };

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(()=>setTime(new Date()),1000); return ()=>clearInterval(t); }, []);

  const stats = [
    { label:"Agent Tasks Run", value:"247", sub:"this session", Icon:Zap, color:"text-purple-400 bg-purple-500/10" },
    { label:"Flows Active", value:"3", sub:"2 scheduled", Icon:GitBranch, color:"text-indigo-400 bg-indigo-500/10" },
    { label:"Log Events", value:"1,842", sub:"last 24h", Icon:ScrollText, color:"text-blue-400 bg-blue-500/10" },
    { label:"Uptime", value:"99.9%", sub:"30-day avg", Icon:TrendingUp, color:"text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400"/>Sree OS Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Agentic developer console — all systems nominal</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          <span className="text-xs font-mono text-muted-foreground">{time.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s=>(
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.Icon className={`w-4 h-4 ${s.color.split(" ")[0]}`}/>
            </div>
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs font-medium text-foreground/70">{s.label}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent agent tasks */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-purple-400"/>Recent Agent Tasks</h3>
          <span className="text-xs text-muted-foreground">{AGENT_TASKS.filter(t=>t.status==="running").length} running</span>
        </div>
        <div className="divide-y divide-border">
          {AGENT_TASKS.map(task=>(
            <div key={task.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20">
              {STATUS_ICON[task.status]}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[task.type]}`}>{task.type}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/>{task.time}</span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[task.status]}`}>{task.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System status */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-3">
            {[
              {name:"AEVOICE API",status:"operational",latency:"42ms"},
              {name:"Sree Engine",status:"operational",latency:"18ms"},
              {name:"GitHub Sync",status:"operational",latency:"--"},
              {name:"OpenAI Bridge",status:"operational",latency:"320ms"},
              {name:"Twilio Webhook",status:"degraded",latency:"1.2s"},
            ].map(s=>(
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.status==="operational"?"bg-emerald-400":s.status==="degraded"?"bg-amber-400":"bg-red-400"}`}/>
                  <span className="text-sm text-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{s.latency}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.status==="operational"?"bg-emerald-500/10 text-emerald-400":s.status==="degraded"?"bg-amber-500/10 text-amber-400":"bg-red-500/10 text-red-400"}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              {label:"Run Health Check",color:"from-purple-500 to-indigo-600"},
              {label:"Pull Latest Logs",color:"from-blue-500 to-cyan-600"},
              {label:"Sync GitHub",color:"from-gray-600 to-gray-800"},
              {label:"Clear Cache",color:"from-amber-500 to-orange-600"},
              {label:"Deploy Functions",color:"from-emerald-500 to-teal-600"},
              {label:"Run Test Suite",color:"from-pink-500 to-rose-600"},
            ].map(a=>(
              <button key={a.label} className={`py-2.5 px-3 rounded-xl bg-gradient-to-r ${a.color} text-white text-xs font-semibold hover:opacity-90 transition-opacity text-left`}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
