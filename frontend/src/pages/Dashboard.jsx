import Sidebar from "../layout/Sidebar";
import {
  FaArrowUp,
  FaShieldAlt,
  FaWallet,
  FaChartLine
} from "react-icons/fa";

import Chart from "react-apexcharts";

function Dashboard() {

  const chartOptions = {
    chart: {
      toolbar: { show: false },
      background: "transparent"
    },
    theme: {
      mode: "dark"
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    colors: ["#38bdf8"],
    grid: {
      borderColor: "#1e293b"
    }
  };

  const chartSeries = [
    {
      name: "Fraud Detection",
      data: [12, 18, 10, 28, 19, 35, 25]
    }
  ];

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 ml-[220px] p-8">

        {/* TOP HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              FinGuard AI Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Real-time fraud monitoring & analytics
            </p>
          </div>

          <div className="bg-slate-900 px-5 py-3 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">
              Active Monitoring
            </p>

            <h3 className="text-xl font-bold text-green-400">
              System Healthy
            </h3>
          </div>

        </div>

        {/* STATS CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Fraud Transactions
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  128
                </h2>
              </div>

              <FaShieldAlt className="text-red-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-red-400">
              <FaArrowUp />
              <span>+12% this week</span>
            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Transaction Volume
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  ₹12.4L
                </h2>
              </div>

              <FaWallet className="text-cyan-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-green-400">
              <FaArrowUp />
              <span>+18% growth</span>
            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Detection Accuracy
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  98%
                </h2>
              </div>

              <FaChartLine className="text-green-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-green-400">
              <FaArrowUp />
              <span>AI performing well</span>
            </div>

          </div>

        </div>

        {/* GRAPH SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Fraud Analytics
              </h2>

              <p className="text-slate-400">
                Weekly fraud detection trends
              </p>
            </div>

            <Chart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={320}
            />

          </div>

          {/* RECENT ACTIVITY */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold">
                  Fraud detected
                </p>

                <span className="text-slate-400 text-sm">
                  2 minutes ago
                </span>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4">
                <p className="font-semibold">
                  New transaction processed
                </p>

                <span className="text-slate-400 text-sm">
                  10 minutes ago
                </span>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">
                  AI model updated
                </p>

                <span className="text-slate-400 text-sm">
                  1 hour ago
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;