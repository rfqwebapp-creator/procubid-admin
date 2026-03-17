import { Routes, Route, Navigate } from "react-router-dom"

import AdminLayout from "./layout/AdminLayout"
import Login from "./pages/admin/Login"

import Dashboard from "./pages/Dashboard"
import Organizations from "./pages/Organizations"
import Users from "./pages/Users"
import Tenders from "./pages/Tenders"
import AuditLogs from "./pages/AuditLogs"
import Pricing from "./pages/Pricing"
import Workflows from "./pages/Workflows"
import Settings from "./pages/Settings"

import EmployeeDashboard from "./pages/employees/EmployeeDashboard"
import EmployeeList from "./pages/employees/EmployeeList"
import ClientDetails from "./pages/employees/ClientDetails"
import RFQTracking from "./pages/employees/RFQTracking"
import EmployeePerformance from "./pages/employees/EmployeePerformance"

import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
    <Routes>

      {/* Default → Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="users" element={<Users />} />
        <Route path="tenders" element={<Tenders />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="pricing" element={<Pricing />} />

        <Route path="employees" element={<EmployeeDashboard />} />
        <Route path="employees/list" element={<EmployeeList />} />
        <Route path="employees/clients" element={<ClientDetails />} />
        <Route path="employees/rfq" element={<RFQTracking />} />
        <Route path="employees/performance" element={<EmployeePerformance />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App







// import { Routes, Route } from "react-router-dom"
// import AdminLayout from "./layout/AdminLayout"

// import Login from "./pages/admin/Login"


// import Dashboard from "./pages/Dashboard"
// import Organizations from "./pages/Organizations"
// import Users from "./pages/Users"
// import Tenders from "./pages/Tenders"
// import AuditLogs from "./pages/AuditLogs"
// import Pricing from "./pages/Pricing"
// import Workflows from "./pages/Workflows"
// import Settings from "./pages/Settings"
// import EmployeeDashboard from "./pages/employees/EmployeeDashboard"
// import EmployeeList from "./pages/employees/EmployeeList"
// import ClientDetails from "./pages/employees/ClientDetails"
// import RFQTracking from "./pages/employees/RFQTracking"
// import EmployeePerformance from "./pages/employees/EmployeePerformance"
// import ProtectedRoute from "./ProtectedRoute"

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<AdminLayout />}>

//         <Route index element={<Dashboard />} />
//         <Route path="organizations" element={<Organizations />} />
//         <Route path="users" element={<Users />} />
//         <Route path="tenders" element={<Tenders />} />
//         <Route path="workflows" element={<Workflows />} />
//         <Route path="audit-logs" element={<AuditLogs />} />
//         <Route path="pricing" element={<Pricing />} />
//         <Route path="/employees" element={<EmployeeDashboard />} />
//         <Route path="/employees/list" element={<EmployeeList />} />
//         <Route path="/employees/clients" element={<ClientDetails />} />
//         <Route path="/employees/rfq" element={<RFQTracking />} />
//         <Route path="/employees/performance" element={<EmployeePerformance />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Route>
//     </Routes>
//   )
// }

// export default App