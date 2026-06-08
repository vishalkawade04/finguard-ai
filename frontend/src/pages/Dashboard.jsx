import { useEffect, useMemo, useState } from "react";
import apiClient from "../api/client";
import Sidebar from "../layout/Sidebar";
import Badge from "../components/Badge";
import { FaArrowUp, FaChartLine, FaCircleNotch, FaExclamationTriangle, FaShieldAlt, FaWallet } from "react-icons/fa";
import Chart from "react-apexcharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await apiClient.get("/api/transactions");
        setTransactions(res.data.transactions || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load dashboard metrics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const metrics = useMemo(() => {
    const totalTransactions = transactions.length;
    const fraudTransactions = transactions.filter((transaction) => transaction.isFraud).length;
    const totalVolume = transactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
    const averageRisk = totalTransactions > 0 ? Math.round(transactions.reduce((sum, transaction) => sum + Number(transaction.riskScore || 0), 0) / totalTransactions) : 0;
    return {
      totalTransactions,
      fraudTransactions,
      totalVolume,
      averageRisk,
      fraudRate: totalTransactions > 0 ? Math.round((fraudTransactions / totalTransactions) * 100) : 0
    };
  }, [transactions]);

  const riskBuckets = useMemo(() => {
    const buckets = { Low: 0, Medium: 0, High: 0 };
    transactions.forEach((transaction) => {
      const level = transaction.riskLevel || "Low";
      buckets[level] = (buckets[level] || 0) + 1;
    });
    return [buckets.Low, buckets.Medium, buckets.High];
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  const chartOptions = {
    chart: { toolbar: { show: false }, background: "transparent", fontFamily: "Inter, sans-serif" },
    colors: ["#14b8a6", "#f59e0b", "#ef4444"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#e2e8f0" },
    legend: { show: false },
    plotOptions: { bar: { borderRadius: 10, columnWidth: "55%" } },
    theme: { mode: "light" },
    xaxis: { categories: ["Low", "Medium", "High"], labels: { style: { colors: "#64748b" } } },
    yaxis: { labels: { style: { colors: "#64748b" } } }
  };

  const chartSeries = [{ name: "Transactions", data: riskBuckets }];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 xl:pl-[280px]">
      <Sidebar />

      <main className="px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Command center</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em] text-slate-950 md:text-4xl">Fraud operations dashboard</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Monitor transaction health, risk distribution, and the newest review activity.</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> AI scoring active
          </div>
        </header>

        {error && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700" role="alert">
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard label="Transaction volume" value={formatCurrency(metrics.totalVolume)} detail={`${metrics.totalTransactions} transactions monitored`} icon={<FaWallet aria-hidden="true" />} tone="bg-teal-50 text-teal-700" isLoading={isLoading} />
          <StatCard label="Fraud transactions" value={metrics.fraudTransactions} detail={`${metrics.fraudRate}% of reviewed activity`} icon={<FaShieldAlt aria-hidden="true" />} tone="bg-red-50 text-red-700" isLoading={isLoading} />
          <StatCard label="Average risk score" value={metrics.averageRisk} detail="Across all available transactions" icon={<FaChartLine aria-hidden="true" />} tone="bg-indigo-50 text-indigo-700" isLoading={isLoading} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Risk distribution</h2>
                <p className="mt-1 text-sm text-slate-500">Transaction count grouped by AI-generated risk level.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Live data</span>
            </div>
            <div className="mt-6 min-h-[320px]">
              {isLoading ? (
                <div className="h-[320px] animate-pulse rounded-3xl bg-slate-100" />
              ) : (
                <Chart options={chartOptions} series={chartSeries} type="bar" height={320} />
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Review summary</h2>
                <p className="mt-1 text-sm text-slate-500">A quick view of current risk posture and transaction mix.</p>
              </div>
              <Badge text={metrics.fraudRate >= 50 ? 'High fraud' : metrics.fraudRate >= 25 ? 'Medium fraud' : 'Low fraud'} variant={metrics.fraudRate >= 50 ? 'High' : metrics.fraudRate >= 25 ? 'Medium' : 'Low'} />
            </div>

            <div className="mt-6 space-y-4">
              {[
                ['Low risk', riskBuckets[0], 'bg-teal-500'],
                ['Medium risk', riskBuckets[1], 'bg-amber-500'],
                ['High risk', riskBuckets[2], 'bg-red-500']
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-950">{isLoading ? '-' : value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`${color} h-full rounded-full`} style={{ width: `${metrics.totalTransactions ? (Number(value) / metrics.totalTransactions) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-amber-600" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-950">Priority queue</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">High-risk transactions should be reviewed first because they combine multiple risk triggers or large transaction values.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-950">Recent transactions</h2>
            <p className="mt-1 text-sm text-slate-500">Latest monitored activity from the transaction API.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoading && [1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-6">
                <FaCircleNotch className="animate-spin text-slate-300" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              </div>
            ))}

            {!isLoading && recentTransactions.length === 0 && (
              <div className="p-8 text-center text-slate-500">No transactions have been recorded yet.</div>
            )}

            {!isLoading && recentTransactions.map((transaction) => (
              <div key={transaction._id || `${transaction.userId}-${transaction.createdAt}`} className="grid gap-4 p-6 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="font-semibold text-slate-950">{transaction.userId || 'Unknown user'}</p>
                  <p className="mt-1 text-sm text-slate-500">{transaction.location || 'Unknown location'}</p>
                </div>
                <div className="space-y-2 text-right">
                  <p className="font-semibold text-slate-950">{formatCurrency(transaction.amount)}</p>
                  <div className="text-sm text-slate-500">Risk score {transaction.riskScore ?? 0}</div>
                </div>
                <div className="space-y-2 sm:text-right">
                  <Badge text={transaction.riskLevel || 'Low'} variant={transaction.riskLevel || 'Low'} />
                  <Badge text={transaction.isFraud ? 'Fraud' : 'Clear'} variant={transaction.isFraud ? 'Fraud' : 'Clear'} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, detail, icon, tone, isLoading }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          {isLoading ? (
            <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
          ) : (
            <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
          )}
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>{icon}</span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </article>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

export default Dashboard;
