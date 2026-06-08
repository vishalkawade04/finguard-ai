import { useEffect, useState } from "react";
import apiClient from "../api/client";
import Sidebar from "../layout/Sidebar";
import Badge from "../components/Badge";
import {
  FaChartBar,
  FaCircleNotch,
  FaExclamationTriangle,
  FaShieldAlt,
  FaWallet
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get("/api/analytics");
        setAnalytics(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load analytics. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const pieData = [
    { name: "Fraud", value: Number(analytics.fraudTransactions || 0) },
    { name: "Clear", value: Number(analytics.safeTransactions || 0) }
  ];

  const barData = [
    { name: "Transactions", Fraud: Number(analytics.fraudTransactions || 0), Clear: Number(analytics.safeTransactions || 0) }
  ];

  const cards = [
    { label: "Total transactions", value: analytics.totalTransactions, detail: "All monitored transaction records", icon: <FaWallet aria-hidden="true" />, tone: "bg-teal-50 text-teal-700" },
    { label: "Fraud transactions", value: analytics.fraudTransactions, detail: `${analytics.fraudPercentage}% fraud rate`, icon: <FaShieldAlt aria-hidden="true" />, tone: "bg-red-50 text-red-700" },
    { label: "Safe transactions", value: analytics.safeTransactions, detail: "Transactions without fraud flag", icon: <FaChartBar aria-hidden="true" />, tone: "bg-emerald-50 text-emerald-700" }
  ];

  const COLORS = ["#ef4444", "#14b8a6"];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 xl:pl-[280px]">
      <Sidebar />

      <main className="px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Analytics</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em] text-slate-950 md:text-4xl">Fraud analytics</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Review portfolio-level fraud trends, clear transaction mix, and current risk posture.</p>
          </div>
          <Badge text={`Overall risk: ${analytics.riskLevel}`} variant={analytics.riskLevel || 'Low'} />
        </header>

        {error && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700" role="alert">
            <FaExclamationTriangle className="mr-2 inline" aria-hidden="true" />
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  {isLoading ? (
                    <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-slate-950">{card.value}</p>
                  )}
                </div>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>{card.icon}</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">{card.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ChartPanel title="Fraud detection ratio" description="Share of fraudulent and clear transactions." isLoading={isLoading}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={110} paddingAngle={6}>
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartPanel>

          <ChartPanel title="Transaction outcome overview" description="Fraud and clear activity shown side by side." isLoading={isLoading}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="Fraud" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Clear" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Fraud percentage</p>
                <p className="mt-4 text-5xl font-semibold text-slate-950">{isLoading ? '-' : `${analytics.fraudPercentage}%`}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Investigate trend</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-red-500" style={{ width: `${Math.min(Number(analytics.fraudPercentage || 0), 100)}%` }} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">AI detection accuracy</p>
                <p className="mt-4 text-5xl font-semibold text-slate-950">{isLoading ? '-' : analytics.accuracy}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Stable</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">Accuracy is currently reported by the existing analytics API and preserved for compatibility.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChartPanel({ title, description, isLoading, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="mt-6 min-h-[320px]">
        {isLoading ? (
          <div className="flex h-[320px] items-center justify-center rounded-3xl bg-slate-50 text-slate-400">
            <FaCircleNotch className="animate-spin" aria-hidden="true" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Analytics;
