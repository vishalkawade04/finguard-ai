import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

import {
  FaChartPie,
  FaExchangeAlt,
  FaChartLine,
  FaSignOutAlt,
  FaShieldAlt
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <FaChartPie aria-hidden="true" />
    },
    {
      label: "Transactions",
      to: "/transactions",
      icon: <FaExchangeAlt aria-hidden="true" />
    },
    {
      label: "Analytics",
      to: "/analytics",
      icon: <FaChartLine aria-hidden="true" />
    }
  ];

  const handleLogout = () => {
    logout(false);
    navigate("/login", { replace: true });
  };

  return (

    <aside className="sticky top-0 z-30 flex w-full flex-col border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur xl:fixed xl:left-0 xl:h-screen xl:w-[280px] xl:border-b-0 xl:border-r xl:px-5 xl:py-6">

      <div className="flex items-center justify-between gap-4 xl:block">

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 rounded-xl text-left transition hover:opacity-90"
          aria-label="Go to dashboard"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <FaShieldAlt aria-hidden="true" />
          </span>

          <span>
            <span className="block text-lg font-semibold text-slate-950">
              FinGuard
            </span>

            <span className="block text-xs font-medium text-slate-500">
              Fraud intelligence
            </span>
          </span>
        </button>

      </div>

      <nav
        className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:mt-10 xl:flex-col xl:overflow-visible xl:pb-0"
        aria-label="Primary navigation"
      >

        {navItems.map((item) => (

          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            <span className="text-base">
              {item.icon}
            </span>

            {item.label}
          </NavLink>

        ))}

      </nav>

      <div className="mt-6 hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Monitoring
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-950">
          AI scoring active
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Every transaction is evaluated for risk level and explanation.
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 xl:mt-auto"
      >
        <FaSignOutAlt aria-hidden="true" />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;
