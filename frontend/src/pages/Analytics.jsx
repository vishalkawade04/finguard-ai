import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

function Analytics() {

  const [fraudCount, setFraudCount] = useState(0);

  useEffect(() => {

  const fetchData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://finguard-ai-r2ux.onrender.com/api/analytics/fraud-count",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFraudCount(res.data.fraudTransactions);

    } catch (err) {

      console.log(err);

    }

  };

  // FIRST FETCH
  fetchData();

  // AUTO REFRESH EVERY 3 SECONDS
  const interval = setInterval(fetchData, 3000);

  // CLEANUP
  return () => clearInterval(interval);

}, []);

  const data = [
    { name: "Fraud", value: fraudCount },
    { name: "Safe", value: 10 }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          marginLeft: window.innerWidth < 768 ? "0px" : "240px",
          padding: "30px",
          width: "100%",
          minHeight: "100vh",
          background: "#020617",
          color: "white"
        }}
      >

        <Navbar />

        <h1 style={{ fontSize: "38px" }}>
          Analytics 📈
        </h1>

        <p style={{ color: "#94a3b8" }}>
          AI-powered fraud insights and monitoring
        </p>

        <div style={chartBox}>

          <h2>Fraud Distribution</h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >

                {
                  data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div style={insightBox}>

          <h2>AI Risk Insights 🤖</h2>

          <div style={insight}>
            🚨 High-value transactions increased today
          </div>

          <div style={insight}>
            🔐 Multiple suspicious login attempts detected
          </div>

          <div style={insight}>
            📊 Current fraud risk level is low
          </div>

        </div>

      </div>

    </div>

  );
}

const chartBox = {

  marginTop: "40px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "25px",
  borderRadius: "20px",
  backdropFilter: "blur(12px)"

};

const insightBox = {

  marginTop: "40px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "25px",
  borderRadius: "20px",
  backdropFilter: "blur(12px)"

};

const insight = {

  background: "#1e293b",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "15px"

};

export default Analytics;
