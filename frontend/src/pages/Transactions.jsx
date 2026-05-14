import { useState } from "react";

import Sidebar from "../layout/Sidebar";

import {
  FaSearch,
  FaShieldAlt
} from "react-icons/fa";

function Transactions() {

  const [search, setSearch] = useState("");

  const transactions = [
    {
      user: "Vishal",
      amount: "₹50,000",
      location: "Mumbai",
      status: "Fraud"
    },
    {
      user: "Rahul",
      amount: "₹12,500",
      location: "Pune",
      status: "Safe"
    },
    {
      user: "Anjali",
      amount: "₹90,000",
      location: "Delhi",
      status: "Fraud"
    },
    {
      user: "Rohit",
      amount: "₹8,000",
      location: "Bangalore",
      status: "Safe"
    }
  ];

  const filteredTransactions = transactions.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
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

          <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl">

            <p className="text-slate-400 text-sm">
              Protected by AI
            </p>

            <h3 className="text-green-400 font-bold">
              Monitoring Active
            </h3>

          </div>

        </div>

        {/* SEARCH BAR */}

        <div className="relative w-full md:w-[400px] mb-8">

          <FaSearch className="absolute top-4 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400"
          />

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
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition duration-300"
                >

                  <td className="p-5 font-semibold">
                    {item.user}
                  </td>

                  <td className="p-5 text-cyan-400 font-bold">
                    {item.amount}
                  </td>

                  <td className="p-5">
                    {item.location}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 w-fit ${
                        item.status === "Fraud"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >

                      <FaShieldAlt />

                      {item.status}

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