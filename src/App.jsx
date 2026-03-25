import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Terminal from "./pages/Terminal";
import FileExplorer from "./pages/FileExplorer";
import AgentLogs from "./pages/AgentLogs";
import FlowBuilder from "./pages/FlowBuilder";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const qc = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30000 } } });

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
            <Route path="/files" element={<FileExplorer />} />
            <Route path="/logs" element={<AgentLogs />} />
            <Route path="/flows" element={<FlowBuilder />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
