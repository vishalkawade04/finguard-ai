import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../layout/Sidebar";

import {
  FaSearch,
  FaShieldAlt
} from "react-icons/fa";

function Transactions() {

  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Safe");

  // FETCH TRANSACTIONS

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

      console.log(res.data);

      setTransactions(res.data.transactions || []);

    } catch (error) {

      console.log(error.response?.data || error);

    }

  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  // ADD TRANSACTION

  const addTransaction = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://finguard-ai-r2ux.onrender.com/api/transactions",
        {
          userId: user,
          amount: Number(amount),
          location,
          isFraud: status === "Fraud"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTransactions();

      setUser("");
      setAmount("");
      setLocation("");
      setStatus("Safe");

    } catch (error) {

      console.log(error.response?.data || error);

    }

  };

  // FILTER

  const filteredTransactions = transactions.filter((item) =>
    (item.location || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 ml-[240px] p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Transactions
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor suspicious activities in real-time
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="relative w-full md:w-[400px] mb-8">

          <FaSearch className="absolute top-4 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none"
          />

        </div>

        {/* FORM */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Transaction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <input
              type="text"
              placeholder="User Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none"
            >

              <option value="Safe">
                Safe
              </option>

              <option value="Fraud">
                Fraud
              </option>

            </select>

            <button
              onClick={addTransaction}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition duration-300"
            >

              Add Transaction

            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-5">
                  User
                </th>

                <th className="text-left p-5">
                  Amount
                </th>

                <th className="text-left p-5">
                  Location
                </th>

                <th className="text-left p-5">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.map((item, index) => (

                <tr
                  key={index}
                  className="border-t border-slate-800"
                >

                  <td className="p-5 font-semibold">
                    {item.userId || "Unknown"}
                  </td>

                  <td className="p-5 text-cyan-400 font-bold">
                    ₹{item.amount}
                  </td>

                  <td className="p-5">
                    {item.location}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 w-fit ${
                        item.isFraud
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >

                      <FaShieldAlt />

                      {item.isFraud ? "Fraud" : "Safe"}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Transactions;

