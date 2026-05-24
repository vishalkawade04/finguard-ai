import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../layout/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar
} from "recharts";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    totalTransactions: 0,
    fraudTransactions: 0,
    safeTransactions: 0,
    fraudPercentage: 0,
    riskLevel: "Low",
    accuracy: "0%"
  });

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/analytics"
        );

        console.log(res.data);

        setAnalytics(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAnalytics();

  }, []);

  // PIE DATA

  const pieData = [

    {
      name: "Fraud",
      value: analytics.fraudTransactions
    },

    {
      name: "Safe",
      value: analytics.safeTransactions
    }

  ];

  // BAR DATA

  const barData = [

    {
      name: "Transactions",
      Fraud: analytics.fraudTransactions,
      Safe: analytics.safeTransactions
    }

  ];

  const COLORS = [
    "#ef4444",
    "#22c55e"
  ];

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 ml-[240px] p-8">

        <h1 className="text-4xl font-bold mb-10">
          AI Analytics Dashboard
        </h1>

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

            <h2 className="text-slate-400 text-lg">
              Total Transactions
            </h2>

            <p className="text-4xl font-bold mt-4 text-cyan-400">
              {analytics.totalTransactions}
            </p>

          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

            <h2 className="text-slate-400 text-lg">
              Fraud Transactions
            </h2>

            <p className="text-4xl font-bold mt-4 text-red-400">
              {analytics.fraudTransactions}
            </p>

          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

            <h2 className="text-slate-400 text-lg">
              Safe Transactions
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-400">
              {analytics.safeTransactions}
            </p>

          </div>

        </div>

        {/* SECOND ROW */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

            <h2 className="text-slate-400 text-lg">
              Fraud Percentage
            </h2>

            <p className="text-5xl font-bold mt-4 text-yellow-400">
              {analytics.fraudPercentage}%
            </p>

          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

            <h2 className="text-slate-400 text-lg">
              Risk Level
            </h2>

            <p className="text-5xl font-bold mt-4 text-red-400">
              {analytics.riskLevel}
            </p>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

          {/* PIE CHART */}

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">

            <h2 className="text-2xl font-bold mb-6">
              Fraud Detection Ratio
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">

            <h2 className="text-2xl font-bold mb-6">
              Transaction Overview
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Fraud"
                  fill="#ef4444"
                />

                <Bar
                  dataKey="Safe"
                  fill="#22c55e"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI ACCURACY */}

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mt-10">

          <h2 className="text-slate-400 text-lg">
            AI Detection Accuracy
          </h2>

          <p className="text-6xl font-bold mt-4 text-cyan-400">
            {analytics.accuracy}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Analytics;