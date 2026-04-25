import React, { useEffect, useState } from "react";
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
import API from "../api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    organizations: 0,
    activeUsers: 0,
    openTenders: 0,
    totalRevenue: 0,
  });

  const [tenderData, setTenderData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await API.get("/dashboard/stats");
      const chartRes = await API.get("/dashboard/charts");

      if (statsRes.data.success) {
        setStats({
          organizations: statsRes.data.data.organizations || 0,
          activeUsers: statsRes.data.data.activeUsers || 0,
          openTenders: statsRes.data.data.openTenders || 0,
          totalRevenue: statsRes.data.data.totalRevenue || 0,
        });
      }

      if (chartRes.data.success) {
        setTenderData(chartRes.data.tenderData || []);
        setRevenueData(chartRes.data.revenueData || []);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Overview of your system's key metrics and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Organizations"
          value={stats.organizations}
          sub="Total registered organizations"
          icon={<Building2 size={22} />}
        />

        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          sub="Total registered users"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Open Tenders"
          value={stats.openTenders}
          sub="Currently active tenders"
          subColor="text-blue-600"
          icon={<FileText size={22} />}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${Number(stats.totalRevenue || 0).toLocaleString("en-IN")}`}
          sub="Subscription revenue"
          icon={<DollarSign size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
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
                <Bar
                  dataKey="tenders"
                  fill="#14b8a6"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="transactions"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Recent Activity
          </h3>

          <div className="space-y-4">
            <ActivityItem
              title="Dashboard connected"
              desc="Live data enabled"
              tag="success"
              time="Now"
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            System Alerts
          </h3>

          <div className="space-y-4">
            <AlertCard
              icon={<AlertTriangle size={18} />}
              title="Dashboard API connected"
              desc="Stats and charts are now loading from backend"
            />

            <AlertCard
              icon={<TrendingUp size={18} />}
              title="Live dashboard enabled"
              desc="Data changes will reflect after page refresh"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;