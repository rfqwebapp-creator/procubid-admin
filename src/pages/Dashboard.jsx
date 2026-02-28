import React from "react";
import {
  Users,
  Building2,
  FileText,
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import StatCard from "../components/dashboard/StatCard";
import ActivityItem from "../components/dashboard/ActivityItem";
import AlertCard from "../components/dashboard/AlertCard";

const Dashboard = () => {

  const tenderData = [
    { month: "Jan", tenders: 45, transactions: 120 },
    { month: "Feb", tenders: 50, transactions: 145 },
    { month: "Mar", tenders: 60, transactions: 160 },
    { month: "Apr", tenders: 48, transactions: 130 },
    { month: "May", tenders: 70, transactions: 190 },
    { month: "Jun", tenders: 65, transactions: 180 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 120 },
    { month: "Feb", revenue: 145 },
    { month: "Mar", revenue: 160 },
    { month: "Apr", revenue: 130 },
    { month: "May", revenue: 195 },
    { month: "Jun", revenue: 180 },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Overview of your system's key metrics and recent activity
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Organizations"
          value="248"
          sub="+12 this month"
          icon={<Building2 size={22} />}
        />
        <StatCard
          title="Active Users"
          value="1,842"
          sub="+5.2% vs last month"
          icon={<Users size={22} />}
        />
        <StatCard
          title="Open Tenders"
          value="37"
          sub="8 closing this week"
          subColor="text-blue-600"
          icon={<FileText size={22} />}
        />
        <StatCard
          title="Total Revenue"
          value="$2.4M"
          sub="+18.3% vs last quarter"
          icon={<DollarSign size={22} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Tenders & Transactions
          </h3>

          <div className="w-full h-64 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tenders" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="transactions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Revenue Trend
          </h3>

          <div className="w-full h-64 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Recent Activity
          </h3>

          <div className="space-y-4">
            <ActivityItem title="New organization registered" desc="TechCorp Inc." tag="info" time="2 min ago" />
            <ActivityItem title="Tender awarded" desc="TND-2024-089" tag="success" time="15 min ago" />
            <ActivityItem title="Compliance alert" desc="Missing audit trail" tag="warning" time="1 hr ago" />
            <ActivityItem title="Pricing updated" desc="Enterprise Plan" tag="info" time="2 hrs ago" />
            <ActivityItem title="User role changed" desc="john@acme.com" tag="info" time="3 hrs ago" />
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            System Alerts
          </h3>

          <div className="space-y-4">
            <AlertCard
              icon={<AlertTriangle size={18} />}
              title="3 organizations pending verification"
              desc="Requires admin approval to activate accounts"
            />

            <AlertCard
              icon={<TrendingUp size={18} />}
              title="System uptime: 99.98%"
              desc="All services operational for the last 30 days"
            />

            <AlertCard
              icon={<AlertTriangle size={18} />}
              title="5 failed login attempts detected"
              desc="Review security logs for details"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;