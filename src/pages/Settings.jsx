import { useState } from "react";
import { Settings, Key, Globe, Bell, Save, CheckCircle2, Loader2, Eye, EyeOff, Cpu } from "lucide-react";

const TABS = [
  { v:"general", l:"General", Icon:Globe },
  { v:"apikeys", l:"API Keys", Icon:Key },
  { v:"notifications", l:"Notifications", Icon:Bell },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState({});
  const [general, setGeneral] = useState({ app_name:"Sree OS", base_url:"https://os.aevoice.ai", theme:"dark", language:"en" });
  const [keys, setKeys] = useState({ openai_key:"", github_token:"", twilio_sid:"", sendgrid_key:"" });

  const save = async () => {
    setSaving(true);
    await new Promise(r=>setTimeout(r,800));
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-white"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">Configure Sree OS</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border pb-1">
        {TABS.map(t=>(
          <button key={t.v} onClick={()=>setTab(t.v)} className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab===t.v?"text-purple-400 border-b-2 border-purple-500":"text-muted-foreground hover:text-foreground"}`}>
            <t.Icon className="w-4 h-4"/>{t.l}
          </button>
        ))}
      </div>

      {tab==="general"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          {[{k:"app_name",l:"App Name"},{k:"base_url",l:"Base URL"},{k:"language",l:"Language"}].map(f=>(
            <div key={f.k} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{f.l}</label>
              <input value={general[f.k]} onChange={e=>setGeneral(p=>({...p,[f.k]:e.target.value}))} className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Theme</label>
            <select value={general.theme} onChange={e=>setGeneral(p=>({...p,theme:e.target.value}))} className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none">
              <option value="dark">Dark (default)</option><option value="light">Light</option>
            </select>
          </div>
          <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving?<Loader2 className="w-4 h-4 animate-spin"/>:saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:<><Save className="w-4 h-4"/>Save Settings</>}
          </button>
        </div>
      )}

      {tab==="apikeys"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          {[{k:"openai_key",l:"OpenAI API Key",ph:"sk-..."},{k:"github_token",l:"GitHub Token",ph:"ghp_..."},{k:"twilio_sid",l:"Twilio SID",ph:"ACxxxxxxxxx"},{k:"sendgrid_key",l:"SendGrid Key",ph:"SG.xxxxxxxxx"}].map(f=>(
            <div key={f.k} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{f.l}</label>
              <div className="relative">
                <input type={show[f.k]?"text":"password"} value={keys[f.k]} onChange={e=>setKeys(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph}
                  className="w-full h-9 px-3 pr-9 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"/>
                <button onClick={()=>setShow(p=>({...p,[f.k]:!p[f.k]}))} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show[f.k]?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}
                </button>
              </div>
            </div>
          ))}
          <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving?<Loader2 className="w-4 h-4 animate-spin"/>:saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:"Save Keys"}
          </button>
        </div>
      )}

      {tab==="notifications"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          {[{l:"Agent task completed",d:"Notify when a background agent task finishes"},{l:"Error alerts",d:"Alert on ERROR level log entries"},{l:"Health check failures",d:"Alert when a service goes degraded or down"},{l:"GitHub sync events",d:"Notify on push / deploy events"},{l:"Daily digest",d:"Summary of activity every morning"}].map(n=>(
            <div key={n.l} className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div><p className="text-sm font-medium text-foreground">{n.l}</p><p className="text-xs text-muted-foreground">{n.d}</p></div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-purple-500"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
