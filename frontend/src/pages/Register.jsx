import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import {
  FaShieldAlt,
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://finguard-ai-r2ux.onrender.com/api/auth/register",
        {
          username: name,
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful 😎");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden text-white">

      {/* GLOW EFFECT */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full"></div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-8">

          <div className="bg-cyan-500/20 p-4 rounded-2xl mb-4">

            <FaShieldAlt className="text-cyan-400 text-4xl" />

          </div>

          <h1 className="text-4xl font-extrabold text-cyan-400">
            FinGuard AI
          </h1>

          <p className="text-slate-400 mt-3 text-center">
            Create your secure fintech account
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleRegister} className="space-y-6">

          {/* NAME */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex items-center px-4">

            <FaUser className="text-slate-400" />

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 outline-none px-4 py-4"
              required
            />

          </div>

          {/* EMAIL */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex items-center px-4">

            <FaEnvelope className="text-slate-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 outline-none px-4 py-4"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex items-center px-4">

            <FaLock className="text-slate-400" />

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 outline-none px-4 py-4"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-2xl transition duration-300 shadow-lg shadow-cyan-500/20"
          >

            Create Account

          </button>

        </form>

        {/* LOGIN */}

        <p className="text-center text-slate-400 mt-8">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-bold"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;