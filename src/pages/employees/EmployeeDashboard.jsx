import { Link } from "react-router-dom"

const EmployeeDashboard = () => {
  return (
    <div className="p-4 md:p-6">

      <h1 className="text-2xl font-bold text-primary mb-6">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/employees/list"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Employee List</h3>
          <p className="text-sm text-gray-500 mt-2">
            View all employees and commission data
          </p>
        </Link>

        <Link
          to="/employees/clients"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Client Details</h3>
          <p className="text-sm text-gray-500 mt-2">
            Clients handled by employees
          </p>
        </Link>

        <Link
          to="/employees/rfq"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">RFQ Tracking</h3>
          <p className="text-sm text-gray-500 mt-2">
            Track RFQ activity
          </p>
        </Link>

        <Link
          to="/employees/performance"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="text-sm text-gray-500 mt-2">
            Employee revenue & performance
          </p>
        </Link>

      </div>

    </div>
  )
}

export default EmployeeDashboard