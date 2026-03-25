import { useState } from "react";
import { FolderOpen, Folder, FileText, FileCode, Search, ChevronRight, ChevronDown } from "lucide-react";

const TREE = [
  { name:"src", type:"dir", open:true, children:[
    { name:"pages", type:"dir", open:true, children:[
      { name:"Dashboard.jsx", type:"jsx" }, { name:"Terminal.jsx", type:"jsx" },
      { name:"FileExplorer.jsx", type:"jsx" }, { name:"AgentLogs.jsx", type:"jsx" },
      { name:"FlowBuilder.jsx", type:"jsx" }, { name:"Settings.jsx", type:"jsx" },
      { name:"Login.jsx", type:"jsx" }, { name:"Layout.jsx", type:"jsx" },
    ]},
    { name:"lib", type:"dir", children:[ { name:"utils.js", type:"js" } ]},
    { name:"App.jsx", type:"jsx" }, { name:"main.jsx", type:"jsx" }, { name:"index.css", type:"css" },
  ]},
  { name:"public", type:"dir", children:[ { name:"favicon.svg", type:"svg" } ]},
  { name:"package.json", type:"json" }, { name:"vite.config.js", type:"js" },
  { name:"tailwind.config.js", type:"js" }, { name:"index.html", type:"html" },
];

const EXT_COLORS = { jsx:"text-blue-400", js:"text-yellow-400", ts:"text-blue-400", tsx:"text-blue-400", css:"text-pink-400", json:"text-amber-400", html:"text-orange-400", svg:"text-purple-400", md:"text-muted-foreground" };
const FileIcon = ({type}) => type==="dir"?<Folder className="w-4 h-4 text-amber-400 flex-shrink-0"/>:<FileCode className={`w-4 h-4 ${EXT_COLORS[type]||"text-muted-foreground"} flex-shrink-0`}/>;

function TreeNode({ node, depth=0 }) {
  const [open, setOpen] = useState(node.open||false);
  const isDir = node.type==="dir";
  return (
    <div>
      <div onClick={()=>isDir&&setOpen(o=>!o)}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-muted/20 cursor-pointer ${isDir?"":"hover:text-foreground text-muted-foreground"}`}
        style={{paddingLeft:`${8+depth*16}px`}}>
        {isDir&&(open?<ChevronDown className="w-3 h-3 text-muted-foreground"/>:<ChevronRight className="w-3 h-3 text-muted-foreground"/>)}
        {!isDir&&<span className="w-3"/>}
        {isDir?(open?<FolderOpen className="w-4 h-4 text-amber-400"/>:<Folder className="w-4 h-4 text-amber-400"/>):<FileIcon type={node.type}/>}
        <span className={`text-sm ${isDir?"font-medium text-foreground":"text-muted-foreground"}`}>{node.name}</span>
      </div>
      {isDir&&open&&node.children?.map((child,i)=><TreeNode key={i} node={child} depth={depth+1}/>)}
    </div>
  );
}

export default function FileExplorer() {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><FolderOpen className="w-6 h-6 text-amber-400"/>File Explorer</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <Search className="w-3.5 h-3.5 text-muted-foreground"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search files…" className="flex-1 bg-transparent text-xs text-foreground focus:outline-none placeholder-muted-foreground/50"/>
          </div>
          <div className="p-2 max-h-96 overflow-y-auto">
            {TREE.map((node,i)=><TreeNode key={i} node={node}/>)}
          </div>
        </div>
        <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <FileText className="w-4 h-4 text-blue-400"/>
            <span className="text-sm font-mono text-muted-foreground">src/App.jsx</span>
          </div>
          <pre className="text-xs font-mono text-green-400/80 leading-relaxed overflow-auto max-h-80">{`import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
// ... more imports

const qc = new QueryClient({ 
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } } 
});

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terminal" element={<Terminal />} />
            {/* ... more routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}
