import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaShieldAlt,
  FaLock,
  FaEnvelope
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://finguard-ai-r2ux.onrender.com",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {

      setError("Invalid email or password");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full top-10 left-10"></div>

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* LOGIN CARD */}

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-10">

          <div className="bg-cyan-500/20 p-5 rounded-3xl mb-5">

            <FaShieldAlt className="text-cyan-400 text-5xl" />

          </div>

          <h1 className="text-4xl font-extrabold text-white">
            FinGuard AI
          </h1>

          <p className="text-slate-400 mt-3 text-center">
            Secure fraud monitoring & AI analytics
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}

          <div>

            <label className="text-slate-300 text-sm">
              Email Address
            </label>

            <div className="mt-2 flex items-center bg-slate-900/70 border border-slate-700 rounded-2xl px-4">

              <FaEnvelope className="text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none px-4 py-4 text-white"
                required
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-slate-300 text-sm">
              Password
            </label>

            <div className="mt-2 flex items-center bg-slate-900/70 border border-slate-700 rounded-2xl px-4">

              <FaLock className="text-slate-400" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none px-4 py-4 text-white"
                required
              />

            </div>

          </div>

          {/* ERROR */}

          {error && (

            <div className="bg-red-500/20 border border-red-500/30 text-red-400 text-center py-3 rounded-2xl">

              {error}

            </div>

          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition duration-300 py-4 rounded-2xl text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/20"
          >

            Secure Login

          </button>

        </form>

        {/* FOOTER */}

        <p className="text-center text-slate-500 text-sm mt-8">

          AI-powered financial fraud detection system

        </p>

      </div>

    </div>
  );
}

export default Login;