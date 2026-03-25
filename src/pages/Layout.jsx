import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Terminal, FolderOpen, ScrollText, GitBranch, Settings, LogOut, Cpu, ChevronRight } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/dashboard",  Icon: LayoutDashboard, label: "Dashboard" },
  { to: "/terminal",   Icon: Terminal,         label: "Terminal" },
  { to: "/files",      Icon: FolderOpen,       label: "Files" },
  { to: "/logs",       Icon: ScrollText,       label: "Agent Logs" },
  { to: "/flows",      Icon: GitBranch,        label: "Flow Builder" },
  { to: "/settings",   Icon: Settings,         label: "Settings" },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-border bg-card/60 transition-all duration-200 ${collapsed ? "w-14" : "w-52"} flex-shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-border">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-4 h-4 text-white"/>
          </div>
          {!collapsed && <span className="font-black text-sm bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">SREE OS</span>}
          <button onClick={()=>setCollapsed(c=>!c)} className={`ml-auto p-1 rounded hover:bg-muted/30 text-muted-foreground transition-transform ${collapsed?"rotate-180":""}`}>
            <ChevronRight className="w-3.5 h-3.5"/>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-1.5 overflow-y-auto">
          {NAV.map(({ to, Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`
              }>
              <Icon className="w-4 h-4 flex-shrink-0"/>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <button onClick={()=>navigate("/login")} className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4 flex-shrink-0"/>
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
