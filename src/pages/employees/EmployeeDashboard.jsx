import { Link } from "react-router-dom"
import {
  Users,
  DollarSign,
  UserCheck,
  Target,
  User,
  Briefcase,
  FileText,
  TrendingUp
} from "lucide-react"

const EmployeeDashboard = () => {

  const performers = [
    { name: "Abijith Anil", role: "Sales Director", revenue: "₹5,00,000", rating: "4.9" },
    { name: "Sarath", role: "Business Dev", revenue: "₹4,50,000", rating: "4.7" },
    { name: "Anumol", role: "Account Manager", revenue: "₹3,00,000", rating: "4.5" },
    { name: "Neethu", role: "Sales Executive", revenue: "₹3,00,000", rating: "4.3" },
    { name: "Niba", role: "Regional Head", revenue: "₹3,00,000", rating: "4.8" },
  ]

  const stats = [
    { dept: "Sales", people: 12, percent: 91 },
    { dept: "Business Dev", people: 8, percent: 85 },
    { dept: "Account Mgmt", people: 6, percent: 78 },
    { dept: "Marketing", people: 4, percent: 72 },
    { dept: "Tender Ops", people: 2, percent: 88 },
  ]

  return (
    <div className="p-6 space-y-8">

        {/* HEADER */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Dashboard
          </h1>
          <p className="text-gray-500">
            Team overview & quick navigation
          </p>
        </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Employees</p>
            <h2 className="text-3xl font-bold">7</h2>
            <p className="text-green-600 text-sm">+2 this month</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Users className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Avg Commission</p>
            <h2 className="text-3xl font-bold">₹45K</h2>
            <p className="text-green-600 text-sm">+8% growth</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <DollarSign className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active Handlers</p>
            <h2 className="text-3xl font-bold">6</h2>
            <p className="text-green-600 text-sm">+1 new</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <UserCheck className="text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Target Hit Rate</p>
            <h2 className="text-3xl font-bold">82%</h2>
            <p className="text-green-600 text-sm">+5% improvement</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Target className="text-blue-600" />
          </div>
        </div>

      </div>


      {/* NAVIGATION CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/employees/list"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
            <User className="text-gray-700"/>
          </div>
          <h3 className="font-semibold text-lg">Employee List</h3>
          <p className="text-gray-500 text-sm mt-1">
            View all employees and commission data
          </p>
        </Link>

        <Link
          to="/employees/clients"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
            <Briefcase className="text-gray-700"/>
          </div>
          <h3 className="font-semibold text-lg">Client Details</h3>
          <p className="text-gray-500 text-sm mt-1">
            Clients handled by employees
          </p>
        </Link>

        <Link
          to="/employees/rfq"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
            <FileText className="text-gray-700"/>
          </div>
          <h3 className="font-semibold text-lg">RFQ Tracking</h3>
          <p className="text-gray-500 text-sm mt-1">
            Track RFQ activity
          </p>
        </Link>

        <Link
          to="/employees/performance"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
            <TrendingUp className="text-gray-700"/>
          </div>
          <h3 className="font-semibold text-lg">Performance</h3>
          <p className="text-gray-500 text-sm mt-1">
            Employee revenue & performance
          </p>
        </Link>

      </div>


      {/* PERFORMANCE + STATS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-lg font-semibold">
            Employee Performance
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Top performers this quarter
          </p>

          <div className="space-y-4">

            {performers.map((emp, index) => (

              <div key={index}>

                <div className="flex justify-between">

                  <div>
                    <p className="font-medium">
                      {index + 1}. {emp.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {emp.role}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{emp.revenue}</p>
                    <p className="text-yellow-500 text-sm">
                      ⭐ {emp.rating}
                    </p>
                  </div>

                </div>

                <div className="h-2 bg-gray-200 rounded mt-2"></div>

              </div>

            ))}

          </div>

        </div>


        {/* QUICK STATS */}

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-lg font-semibold">
            Quick Stats
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Department breakdown
          </p>

          <div className="space-y-4">

            {stats.map((s, index) => (

              <div key={index}>

                <div className="flex justify-between text-sm mb-1">
                  <span>{s.dept}</span>
                  <span>{s.people} ppl • {s.percent}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded h-2">

                  <div
                    className="bg-green-600 h-2 rounded"
                    style={{ width: s.percent + '%' }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default EmployeeDashboard