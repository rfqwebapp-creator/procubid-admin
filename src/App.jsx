import { Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"

import Dashboard from "./pages/Dashboard"
import Organizations from "./pages/Organizations"
import Users from "./pages/Users"
import Tenders from "./pages/Tenders"
import AuditLogs from "./pages/AuditLogs"
import Pricing from "./pages/Pricing"
import Workflows from "./pages/Workflows"
import Settings from "./pages/Settings"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="users" element={<Users />} />
        <Route path="tenders" element={<Tenders />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App