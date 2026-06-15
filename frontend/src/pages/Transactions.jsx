import { useEffect, useMemo, useState } from "react";
import apiClient from "../api/client";
import Sidebar from "../layout/Sidebar";
import Badge from "../components/Badge";
import ExpandableText from "../components/ExpandableText";
import {
  FaCircleNotch,
  FaFilter,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaTimesCircle,
  FaCheckCircle
} from "react-icons/fa";

function Transactions() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const loadTransactions = async () => {
    setError("");

    try {
      const res = await apiClient.get("/api/transactions");
      setTransactions(res.data.transactions || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const addTransaction = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    if (!user.trim() || !amount || !location.trim()) {
      setFormError("User, amount, and location are required.");
      return;
    }

    if (Number(amount) <= 0) {
      setFormError("Amount must be greater than zero.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post("/api/transactions", {
        userId: user.trim(),
        amount: Number(amount),
        location: location.trim()
      });

      setSuccess("Transaction submitted and scored successfully.");
      setUser("");
      setAmount("");
      setLocation("");
      await loadTransactions();
    } catch (err) {
      setFormError(err?.response?.data?.message || "Unable to add transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase().trim();

    return transactions.filter((item) => {
      const matchesQuery =
        !query ||
        [item.userId, item.location, item.riskLevel, item.explanation]
          .some((value) => String(value || "").toLowerCase().includes(query));

      const matchesRisk =
        riskFilter === "All" || (item.riskLevel || "Low") === riskFilter;

      return matchesQuery && matchesRisk;
    });
  }, [transactions, search, riskFilter]);

  const counts = useMemo(
    () => ({
      total: transactions.length,
      high: transactions.filter((item) => item.riskLevel === "High").length,
      fraud: transactions.filter((item) => item.isFraud).length
    }),
    [transactions]
  );

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 xl:pl-[280px]">
      <Sidebar />

      <main className="px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Transaction monitoring
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em] text-slate-950 md:text-4xl">
              Transactions
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Submit payments for AI risk scoring and review explanations from the fraud engine.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
            <SummaryCard label="Total" value={counts.total} />
            <SummaryCard label="High risk" value={counts.high} tone="text-orange-700 bg-orange-50" />
            <SummaryCard label="Fraud" value={counts.fraud} tone="text-red-700 bg-red-50" />
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Add transaction</h2>
              <p className="mt-1 text-sm text-slate-500">
                New records are scored immediately and returned with risk analysis.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              <FaShieldAlt aria-hidden="true" /> AI scoring enabled
            </div>
          </div>

          <form onSubmit={addTransaction} className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <Field label="User" id="transaction-user" value={user} onChange={setUser} placeholder="customer_1024" />
            <Field label="Amount" id="transaction-amount" type="number" value={amount} onChange={setAmount} placeholder="125000" />
            <Field label="Location" id="transaction-location" value={location} onChange={setLocation} placeholder="New York, NY" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-[46px] items-center justify-center gap-2 self-end rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <FaCircleNotch className="animate-spin" aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
              Add
            </button>
          </form>

          {(formError || success) && (
            <div
              className={`mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
                formError ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
              role="status"
            >
              {formError ? <FaTimesCircle className="mt-0.5" aria-hidden="true" /> : <FaCheckCircle className="mt-0.5" aria-hidden="true" />}
              {formError || success}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Review queue</h2>
                <p className="mt-1 text-sm text-slate-500">Search by user, location, risk level, or explanation.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block" htmlFor="transaction-search">
                  <span className="sr-only">Search transactions</span>
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="transaction-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search transactions"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100 sm:w-72"
                  />
                </label>

                <label className="relative block" htmlFor="risk-filter">
                  <span className="sr-only">Filter by risk level</span>
                  <FaFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <select
                    id="risk-filter"
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100 sm:w-40"
                  >
                    {['All', 'Low', 'Medium', 'High'].map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="m-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
              <FaTimesCircle className="mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            {/* Mobile list */}
            <div className="space-y-4 lg:hidden">
              {isLoading && [1,2,3].map(i => (
                <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4" />
              ))}

              {!isLoading && filteredTransactions.map((item) => (
                <article key={item._id || `${item.userId}-${item.createdAt}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{item.userId || 'Unknown'}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.location || 'Unknown'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-950">{formatCurrency(item.amount)}</p>
                      <div className="mt-2"> <Badge text={item.riskLevel || 'Low'} variant={item.riskLevel || 'Low'} /> </div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-slate-600">
                    <ExpandableText text={item.explanation} />
                  </div>
                </article>
              ))}

              {!isLoading && filteredTransactions.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <p className="text-sm text-slate-500">No transactions match your search.</p>
                </div>
              )}
            </div>

            {/* Desktop table */}
            <table className="hidden lg:table w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Fraud</th>
                  <th className="px-5 py-4">Risk</th>
                  <th className="px-5 py-4">Risk Level</th>
                  <th className="px-5 py-4">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading && [1, 2, 3, 4].map((item) => (
                  <tr key={item} className="animate-pulse">
                    <td className="px-5 py-6" colSpan="7">
                      <div className="h-5 rounded-full bg-slate-200" />
                    </td>
                  </tr>
                ))}

                {!isLoading && filteredTransactions.map((item) => (
                  <tr key={item._id || `${item.userId}-${item.createdAt}`} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-950">{item.userId || 'Unknown'}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-950">{formatCurrency(item.amount)}</td>
                    <td className="px-5 py-4 text-slate-600">{item.location || 'Unknown'}</td>
                    <td className="px-5 py-4">
                      <Badge text={item.isFraud ? 'Fraud' : 'Clear'} variant={item.isFraud ? 'Fraud' : 'Clear'} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                          <span>{item.riskScore ?? 0}</span>
                          <span>/100</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              item.riskScore >= 80
                                ? 'bg-red-500'
                                : item.riskScore >= 45
                                ? 'bg-amber-500'
                                : 'bg-teal-500'
                            }`}
                            style={{ width: `${Math.min(Math.max(item.riskScore ?? 0, 0), 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge text={item.riskLevel || 'Low'} variant={item.riskLevel || 'Low'} />
                    </td>
                    <td className="px-5 py-4 max-w-[420px]">
                      <ExpandableText text={item.explanation} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isLoading && filteredTransactions.length === 0 && (
            <div className="border-t border-slate-100 px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <FaSearch aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950">No transactions found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Adjust your search or risk filter, or add a new transaction above.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Field({ id, label, value, onChange, placeholder, type = "text" }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}

function SummaryCard({ label, value, tone = "text-slate-950 bg-slate-50" }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center ${tone}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "No timestamp";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export default Transactions;
