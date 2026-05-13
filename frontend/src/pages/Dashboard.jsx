import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  FiAlertTriangle,
  FiDollarSign,
  FiShield
} from "react-icons/fi";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

function Dashboard() {

  const [fraudCount, setFraudCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:5000/api/analytics/fraud-count',
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

    fetchData();

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
          Welcome back, Vishal 👋
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Real-time AI Fraud Monitoring System
        </p>

        {/* CARDS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >

          <div style={card}>

            <FiAlertTriangle
              size={35}
              color="#ef4444"
            />

            <h2>{fraudCount}</h2>

            <p>Fraud Transactions</p>

          </div>

          <div style={card}>

            <FiDollarSign
              size={35}
              color="#38bdf8"
            />

            <h2>₹ 12.4L</h2>

            <p>Total Volume</p>

          </div>

          <div style={card}>

            <FiShield
              size={35}
              color="#22c55e"
            />

            <h2>98%</h2>

            <p>Detection Accuracy</p>

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div style={activityBox}>

          <h2>Recent Activity ⚡</h2>

          <div style={activity}>
            🚨 Fraud transaction detected from Mumbai
          </div>

          <div style={activity}>
            ✅ Safe transaction processed from Pune
          </div>

          <div style={activity}>
            🔐 Admin logged into dashboard
          </div>

        </div>

        {/* CHART */}

        <div style={chartBox}>

          <h2>Fraud Analytics 📈</h2>

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

      </div>

    </div>

  );
}

const card = {

  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "30px",
  borderRadius: "20px",
  width: "260px",
  backdropFilter: "blur(12px)",
  boxShadow: "0 0 20px rgba(0,0,0,0.25)"

};

const activityBox = {

  marginTop: "40px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "25px",
  borderRadius: "20px",
  backdropFilter: "blur(12px)"

};

const activity = {

  background: "#1e293b",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "15px"

};

const chartBox = {

  marginTop: "40px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "25px",
  borderRadius: "20px",
  backdropFilter: "blur(12px)"

};

export default Dashboard;
