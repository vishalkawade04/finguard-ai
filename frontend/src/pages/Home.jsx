import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaChartLine,
  FaLock,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";

function Home() {

  const metrics = [
    {
      label: "Risk rules evaluated",
      value: "3.8M"
    },
    {
      label: "Median review time",
      value: "42s"
    },
    {
      label: "Model availability",
      value: "99.9%"
    }
  ];

  const features = [
    {
      icon: <FaShieldAlt aria-hidden="true" />,
      title: "Risk scoring",
      copy: "Score every transaction with transparent risk levels and analyst-ready explanations."
    },
    {
      icon: <FaChartLine aria-hidden="true" />,
      title: "Operational analytics",
      copy: "Track fraud rate, review volume, and transaction health from a focused command center."
    },
    {
      icon: <FaLock aria-hidden="true" />,
      title: "Enterprise controls",
      copy: "Built for authenticated workflows, audit-friendly monitoring, and secure review teams."
    }
  ];

  return (

    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">

      <nav className="border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl"
            aria-label="FinGuard home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <FaShieldAlt aria-hidden="true" />
            </span>

            <span className="text-lg font-semibold">
              FinGuard
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Get started
            </Link>

          </div>

        </div>

      </nav>

      <main>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-24">

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">
              <FaCheckCircle aria-hidden="true" />
              AI fraud operations for fintech teams
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.01em] text-slate-950 md:text-6xl">
              Transaction risk intelligence for modern financial teams.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              FinGuard helps fraud analysts monitor transaction risk, explain suspicious behavior, and act faster with a clean operational workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Create workspace
                <FaArrowRight aria-hidden="true" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-950"
              >
                Sign in
              </Link>

            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">

              {metrics.map((metric) => (

                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <dt className="text-sm text-slate-500">
                    {metric.label}
                  </dt>

                  <dd className="mt-2 text-2xl font-semibold text-slate-950">
                    {metric.value}
                  </dd>
                </div>

              ))}

            </dl>

          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">
                    Risk operations
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Live review queue
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Healthy
                </span>
              </div>

              <div className="mt-5 space-y-3">

                {[
                  ["ACH transfer", "$128,440", "High", "98"],
                  ["Card payment", "$4,210", "Low", "12"],
                  ["Wire transfer", "$78,900", "Medium", "56"]
                ].map(([name, amount, level, score]) => (

                  <div
                    key={name}
                    className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-white/5 p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {name}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {amount} transaction under review
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-teal-300">
                        {score}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {level}
                      </p>
                    </div>
                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

        <section className="border-t border-slate-200 bg-white px-5 py-16">

          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Platform
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Built for operational clarity.
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              {features.map((feature) => (

                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.copy}
                  </p>
                </article>

              ))}

            </div>

          </div>

        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 FinGuard. Fraud intelligence for financial operations.
          </p>

          <p>
            Built for US fintech teams.
          </p>
        </div>

      </footer>

    </div>
  );
}

export default Home;
