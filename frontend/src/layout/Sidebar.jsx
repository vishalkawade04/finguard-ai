import { Link, useNavigate } from "react-router-dom";

import {
  FaChartPie,
  FaExchangeAlt,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="fixed left-0 top-0 w-[240px] h-screen bg-slate-950 border-r border-slate-800 p-6">

      {/* LOGO */}

      <div className="mb-12">

        <h1 className="text-4xl font-extrabold text-cyan-400">
          FinGuard
        </h1>

        <p className="text-slate-400 mt-2">
          AI Fraud System
        </p>

      </div>

      {/* NAVIGATION */}

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 bg-slate-900 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-400 px-5 py-4 rounded-2xl transition duration-300"
        >
          <FaChartPie />
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className="flex items-center gap-3 bg-slate-900 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-400 px-5 py-4 rounded-2xl transition duration-300"
        >
          <FaExchangeAlt />
          Transactions
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 bg-slate-900 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-400 px-5 py-4 rounded-2xl transition duration-300"
        >
          <FaChartLine />
          Analytics
        </Link>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-bold transition duration-300"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;