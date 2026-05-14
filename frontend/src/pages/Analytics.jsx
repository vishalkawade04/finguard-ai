import Sidebar from "../layout/Sidebar";

import Chart from "react-apexcharts";

import {
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaArrowUp
} from "react-icons/fa";

function Analytics() {

  const lineOptions = {
    chart: {
      toolbar: { show: false },
      background: "transparent"
    },

    theme: {
      mode: "dark"
    },

    stroke: {
      curve: "smooth",
      width: 4
    },

    colors: ["#38bdf8"],

    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },

    grid: {
      borderColor: "#1e293b"
    }
  };

  const lineSeries = [
    {
      name: "Fraud Cases",
      data: [12, 18, 10, 28, 19, 35, 25]
    }
  ];

  const donutOptions = {
    labels: ["Safe", "Fraud"],
    colors: ["#22c55e", "#ef4444"],

    legend: {
      labels: {
        colors: "#fff"
      }
    },

    theme: {
      mode: "dark"
    }
  };

  const donutSeries = [82, 18];

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 ml-[240px] p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Analytics
            </h1>

            <p className="text-slate-400 mt-2">
              AI-powered fraud insights & monitoring
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl">

            <p className="text-slate-400 text-sm">
              AI Engine
            </p>

            <h3 className="text-green-400 font-bold">
              Running Smoothly
            </h3>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Fraud Detected
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  128
                </h2>

              </div>

              <FaShieldAlt className="text-red-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-red-400">
              <FaArrowUp />
              +12% increase
            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  AI Accuracy
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  98%
                </h2>

              </div>

              <FaRobot className="text-cyan-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-green-400">
              <FaArrowUp />
              Optimized model
            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Risk Score
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  Low
                </h2>

              </div>

              <FaChartLine className="text-green-400 text-4xl" />

            </div>

            <div className="mt-4 flex items-center gap-2 text-green-400">
              <FaArrowUp />
              System stable
            </div>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LINE CHART */}

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="mb-6">

              <h2 className="text-2xl font-bold">
                Fraud Trends
              </h2>

              <p className="text-slate-400">
                Weekly detection analytics
              </p>

            </div>

            <Chart
              options={lineOptions}
              series={lineSeries}
              type="area"
              height={320}
            />

          </div>

          {/* DONUT CHART */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="mb-6">

              <h2 className="text-2xl font-bold">
                Fraud Ratio
              </h2>

              <p className="text-slate-400">
                Safe vs Fraud transactions
              </p>

            </div>

            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={320}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;