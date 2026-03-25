import { useState } from "react";
import { GitBranch, Plus, Play, Pause, Trash2, Zap, ArrowDown, X } from "lucide-react";

const NODE_TYPES = [
  { type:"trigger", label:"Trigger", color:"bg-purple-500/15 border-purple-500/30 text-purple-400" },
  { type:"action", label:"Action", color:"bg-blue-500/15 border-blue-500/30 text-blue-400" },
  { type:"condition", label:"Condition", color:"bg-amber-500/15 border-amber-500/30 text-amber-400" },
  { type:"delay", label:"Delay", color:"bg-muted border-border text-muted-foreground" },
  { type:"end", label:"End", color:"bg-emerald-500/15 border-emerald-500/30 text-emerald-400" },
];

const SAMPLE_FLOWS = [
  { id:1, name:"Post-Call Learning", status:"active", nodes:4, lastRun:"2 min ago" },
  { id:2, name:"New Lead Welcome", status:"active", nodes:6, lastRun:"18 min ago" },
  { id:3, name:"Weekly Health Check", status:"paused", nodes:3, lastRun:"1 day ago" },
];

export default function FlowBuilder() {
  const [flows, setFlows] = useState(SAMPLE_FLOWS);
  const [selected, setSelected] = useState(SAMPLE_FLOWS[0]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [nodes, setNodes] = useState([
    { id:1, type:"trigger", label:"Call Ended", note:"Fires when a call session closes" },
    { id:2, type:"action", label:"Extract Transcript", note:"Parse call transcript for insights" },
    { id:3, type:"condition", label:"New KB Gap?", note:"Check if question was unanswered" },
    { id:4, type:"action", label:"Update Knowledge Base", note:"Add gap to KnowledgeGap entity" },
    { id:5, type:"end", label:"Done", note:"Flow complete" },
  ]);

  const toggleFlow = (id) => setFlows(f=>f.map(fl=>fl.id===id?{...fl,status:fl.status==="active"?"paused":"active"}:fl));
  const deleteFlow = (id) => { setFlows(f=>f.filter(fl=>fl.id!==id)); if(selected?.id===id) setSelected(null); };
  const addFlow = () => {
    if(!newName) return;
    const f = { id:Date.now(), name:newName, status:"active", nodes:1, lastRun:"never" };
    setFlows(p=>[...p,f]); setSelected(f); setNewName(""); setShowNew(false);
  };
  const addNode = () => setNodes(n=>[...n.slice(0,-1), { id:Date.now(), type:"action", label:"New Action", note:"Configure this action" }, n[n.length-1]]);
  const removeNode = (id) => setNodes(n=>n.filter(nd=>nd.id!==id));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><GitBranch className="w-6 h-6 text-indigo-400"/>Flow Builder</h1>
        <button onClick={()=>setShowNew(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-purple-500/20">
          <Plus className="w-4 h-4"/>New Flow
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Flow list */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Flows ({flows.length})</h3>
          {flows.map(f=>(
            <div key={f.id} onClick={()=>setSelected(f)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${selected?.id===f.id?"border-purple-500/50 bg-purple-500/8":"border-border bg-card hover:bg-muted/20"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.nodes} nodes · {f.lastRun}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={e=>{e.stopPropagation();toggleFlow(f.id);}} className={`p-1.5 rounded-lg transition-colors ${f.status==="active"?"bg-amber-500/10 text-amber-400":"bg-emerald-500/10 text-emerald-400"}`}>
                    {f.status==="active"?<Pause className="w-3 h-3"/>:<Play className="w-3 h-3"/>}
                  </button>
                  <button onClick={e=>{e.stopPropagation();deleteFlow(f.id);}} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3 h-3"/>
                  </button>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-2 inline-block ${f.status==="active"?"bg-emerald-500/10 text-emerald-400":"bg-muted text-muted-foreground"}`}>{f.status}</span>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="md:col-span-2">
          {!selected ? (
            <div className="bg-card border border-dashed border-border rounded-2xl flex items-center justify-center py-24 text-center">
              <div><GitBranch className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3"/><p className="text-foreground font-medium">Select a flow</p></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{selected.name}</h3>
                  <p className="text-xs text-muted-foreground">Last run: {selected.lastRun}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={addNode} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-semibold hover:bg-purple-500/20">
                    <Plus className="w-3.5 h-3.5"/>Add Node
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20">
                    <Play className="w-3.5 h-3.5"/>Test Run
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {nodes.map((node, i) => {
                  const ntype = NODE_TYPES.find(t=>t.type===node.type)||NODE_TYPES[0];
                  return (
                    <div key={node.id}>
                      <div className={`flex items-center gap-3 p-4 rounded-2xl border ${ntype.color} bg-card`}>
                        <div className={`w-8 h-8 rounded-lg border ${ntype.color} flex items-center justify-center flex-shrink-0`}>
                          <Zap className="w-4 h-4"/>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{node.label}</p>
                          <p className="text-xs opacity-70">{node.note}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium opacity-70">{ntype.label}</span>
                        {node.type!=="trigger"&&node.type!=="end"&&(
                          <button onClick={()=>removeNode(node.id)} className="p-1 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 opacity-0 hover:opacity-100 transition-all">
                            <X className="w-3.5 h-3.5"/>
                          </button>
                        )}
                      </div>
                      {i<nodes.length-1&&<div className="flex justify-center py-1"><ArrowDown className="w-4 h-4 text-muted-foreground/30"/></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showNew&&(
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5"><h3 className="font-bold text-foreground">New Flow</h3><button onClick={()=>setShowNew(false)}><X className="w-5 h-5 text-muted-foreground"/></button></div>
            <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. New Lead Nurture" className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-4"/>
            <div className="flex gap-3">
              <button onClick={()=>setShowNew(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm">Cancel</button>
              <button onClick={addFlow} disabled={!newName} className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
