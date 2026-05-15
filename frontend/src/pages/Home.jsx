import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaLock
} from "react-icons/fa";

function Home() {

  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full"></div>

      {/* NAVBAR */}

      <nav className="relative z-10 flex justify-between items-center px-8 py-6 border-b border-slate-800 backdrop-blur-xl">

        <div>

          <h1 className="text-3xl font-extrabold text-cyan-400">
            FinGuard AI
          </h1>

        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="border border-slate-700 hover:border-cyan-400 px-6 py-3 rounded-2xl font-bold transition duration-300"
          >

            Login

          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-2xl font-bold transition duration-300 shadow-lg shadow-cyan-500/20"
          >

            Register

          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28">

        <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-3 rounded-full text-cyan-400 mb-8">

          AI-Powered Fraud Detection Platform

        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight max-w-5xl">

          Secure Financial Transactions
          <span className="text-cyan-400">
            {" "}with AI Intelligence
          </span>

        </h1>

        <p className="text-slate-400 text-xl max-w-3xl mt-8 leading-relaxed">

          FinGuard AI helps organizations monitor fraudulent activities,
          detect suspicious transactions, and protect financial systems
          using intelligent analytics & real-time monitoring.

        </p>

        {/* STATS */}

        <div className="flex gap-10 mt-10 flex-wrap justify-center">

          <div>

            <h2 className="text-4xl font-bold text-cyan-400">
              99.8%
            </h2>

            <p className="text-slate-400 mt-2">
              Fraud Detection Accuracy
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-green-400">
              24/7
            </h2>

            <p className="text-slate-400 mt-2">
              Real-Time Monitoring
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-purple-400">
              1M+
            </h2>

            <p className="text-slate-400 mt-2">
              Transactions Analyzed
            </p>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex gap-6 mt-12 flex-wrap justify-center">

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 shadow-lg shadow-cyan-500/20"
          >

            Start Free Trial

          </Link>

          <Link
            to="/dashboard"
            className="border border-slate-700 hover:border-cyan-400 px-8 py-4 rounded-2xl text-lg font-bold transition duration-300"
          >

            Live Demo

          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative z-10 px-8 pb-24">

        <div className="max-w-7xl mx-auto mb-16 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Enterprise Fraud Protection
          </h2>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto">

            AI-driven monitoring, intelligent analytics, and secure
            transaction protection built for modern fintech systems.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

          {/* CARD 1 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">

            <FaShieldAlt className="text-cyan-400 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Fraud Detection
            </h2>

            <p className="text-slate-400 leading-relaxed">

              Detect suspicious activities instantly using intelligent AI models.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">

            <FaChartLine className="text-green-400 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Real-Time Analytics
            </h2>

            <p className="text-slate-400 leading-relaxed">

              Monitor transactions and fraud trends with live analytics dashboards.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">

            <FaRobot className="text-purple-400 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              AI Intelligence
            </h2>

            <p className="text-slate-400 leading-relaxed">

              Leverage machine learning models for smarter fraud prediction.

            </p>

          </div>

          {/* CARD 4 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">

            <FaLock className="text-red-400 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Secure Platform
            </h2>

            <p className="text-slate-400 leading-relaxed">

              Enterprise-grade authentication and secure transaction monitoring.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-slate-800 py-8 text-center text-slate-500">

        © 2026 FinGuard AI • Secure Fintech Intelligence Platform

      </footer>

    </div>
  );
}

export default Home;