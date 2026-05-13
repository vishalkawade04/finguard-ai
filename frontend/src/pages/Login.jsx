import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password
        }
      );

      setError("");

      localStorage.setItem('token', res.data.token);

      navigate('/dashboard');

    } catch (error) {

      setError("Invalid email or password");

      console.log(error);

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          FinGuard 🔐
        </h1>

        <p style={styles.subtitle}>
          AI Powered Fraud Detection Dashboard
        </p>

        <form onSubmit={handleLogin} style={styles.form}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Login
          </button>

          {
            error && (
              <p
                style={{
                  color: "#ef4444",
                  marginTop: "15px",
                  textAlign: "center",
                  fontWeight: "500"
                }}
              >
                {error}
              </p>
            )
          }

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #020617, #0f172a, #111827)"
  },

  card: {
    width: "350px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(18px)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    textAlign: "center",
    color: "white"
  },

  title: {
    marginBottom: "10px",
    fontSize: "32px"
  },

  subtitle: {
    marginBottom: "30px",
    color: "#cbd5e1"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "16px",
    width: "90%"
  },

  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#38bdf8",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "90%",
    boxShadow: "0 0 20px rgba(56,189,248,0.4)",
    transition: "0.3s"
  }

};

export default Login;
