import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { isAuthValid, setToken } from "../utils/auth";

import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaSpinner,
  FaUser
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (isAuthValid()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await apiClient.post("/api/auth/register", {
        username: name,
        email,
        password
      });

      if (res?.data?.token) {
        setToken(res.data.token);
        navigate(from, { replace: true });
        return;
      }

      setError("Registration failed. Please confirm your details and try again.");
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(message || "Registration failed. Please confirm your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <main className="grid min-h-screen bg-[#f6f8fb] text-slate-950 lg:grid-cols-[0.9fr_1fr]">

      <aside className="hidden border-r border-slate-200 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">

        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-xl"
          aria-label="FinGuard home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
            <FaShieldAlt aria-hidden="true" />
          </span>

          <span className="text-lg font-semibold">
            FinGuard
          </span>
        </Link>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
            Launch fraud operations
          </p>

          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight">
            Create a review workspace with transaction risk intelligence built in.
          </h1>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {["Explainable scoring", "Risk dashboard", "Fraud indicators", "Secure access"].map((item) => (

              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200"
              >
                {item}
              </div>

            ))}
          </div>
        </div>

      </aside>

      <section className="flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-3 rounded-xl lg:hidden"
            aria-label="FinGuard home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
              <FaShieldAlt aria-hidden="true" />
            </span>

            <span className="text-lg font-semibold">
              FinGuard
            </span>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                New workspace
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Create your account
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Set up access to transaction monitoring, fraud analytics, and AI-generated explanations.
              </p>
            </div>

            <form
              onSubmit={handleRegister}
              className="mt-8 space-y-5"
            >

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <FaUser
                    className="text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Vishal Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-0 bg-transparent py-3.5 text-slate-950 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Work email
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <FaEnvelope
                    className="text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="analyst@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-0 bg-transparent py-3.5 text-slate-950 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <FaLock
                    className="text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-0 bg-transparent py-3.5 text-slate-950 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {error && (

                <div
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  role="alert"
                >
                  {error}
                </div>

              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading && (
                  <FaSpinner
                    className="animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create account
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-700 hover:text-teal-800"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Register;
