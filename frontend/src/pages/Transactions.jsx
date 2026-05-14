import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiAlertTriangle,
  FiCheckCircle,
  FiCreditCard
} from "react-icons/fi";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchTransactions = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://finguard-ai-r2ux.onrender.com/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTransactions(res.data.transactions);

      } catch (error) {

        console.log(error);

      }

    };

    fetchTransactions();

  }, []);

  const filteredTransactions = transactions.filter((tx) =>
    tx.location.toLowerCase().includes(search.toLowerCase())
  );

  const fraudTransactions = transactions.filter(
    (tx) => tx.isFraud
  ).length;

  const safeTransactions =
    transactions.length - fraudTransactions;

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          marginLeft: window.innerWidth < 768 ? "0px" : "240px",
          padding: window.innerWidth < 768 ? "15px" : "30px",
          width: "100%",
          minHeight: "100vh",
          background: "#020617",
          color: "white"
        }}
      >

        <Navbar />

        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px"
          }}
        >
          Transactions 💳
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Monitor and track transaction activity
        </p>

        {/* TOP STATS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >

          {/* CARD 1 */}

          <div style={card}>

            <FiCreditCard
              size={35}
              color="#38bdf8"
            />

            <h2 style={{ marginTop: "15px" }}>
              {transactions.length}
            </h2>

            <p style={{ color: "#94a3b8" }}>
              Total Transactions
            </p>

          </div>

          {/* CARD 2 */}

          <div style={card}>

            <FiAlertTriangle
              size={35}
              color="#ef4444"
            />

            <h2 style={{ marginTop: "15px" }}>
              {fraudTransactions}
            </h2>

            <p style={{ color: "#94a3b8" }}>
              Fraud Transactions
            </p>

          </div>

          {/* CARD 3 */}

          <div style={card}>

            <FiCheckCircle
              size={35}
              color="#22c55e"
            />

            <h2 style={{ marginTop: "15px" }}>
              {safeTransactions}
            </h2>

            <p style={{ color: "#94a3b8" }}>
              Safe Transactions
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />

        {/* TABLE */}

        <div
          style={{
            marginTop: "30px",
            overflowX: "auto",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            padding: "20px",
            boxShadow: "0 0 20px rgba(0,0,0,0.25)"
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  color: "#94a3b8",
                  borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
              >

                <th style={th}>User</th>
                <th style={th}>Amount</th>
                <th style={th}>Location</th>
                <th style={th}>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredTransactions.map((tx) => (

                  <tr
                    key={tx._id}
                    style={{
                      transition: "0.3s"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "transparent";
                    }}
                  >

                    <td style={td}>
                      {tx.userId}
                    </td>

                    <td style={td}>
                      ₹ {tx.amount}
                    </td>

                    <td style={td}>
                      {tx.location}
                    </td>

                    <td style={td}>

                      {
                        tx.isFraud ? (

                          <span style={fraudBadge}>
                            Fraud
                          </span>

                        ) : (

                          <span style={safeBadge}>
                            Safe
                          </span>

                        )
                      }

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

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

const searchBox = {

  marginTop: "30px",
  padding: "14px",
  width: "350px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  fontSize: "15px"

};

const th = {

  textAlign: "left",
  padding: "18px"

};

const td = {

  padding: "18px",
  borderBottom: "1px solid rgba(255,255,255,0.05)"

};

const fraudBadge = {

  background: "#ef4444",
  color: "white",
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "bold"

};

const safeBadge = {

  background: "#22c55e",
  color: "white",
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "bold"

};

export default Transactions;
