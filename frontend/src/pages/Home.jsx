import { Link } from "react-router-dom";

function Home() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #020617, #0f172a)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <div
        style={{
          textAlign: "center",
          maxWidth: "900px"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            fontSize: "70px",
            marginBottom: "20px",
            color: "#38bdf8"
          }}
        >
          FinGuard 🔐
        </h1>

        {/* SUBTITLE */}

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px"
          }}
        >
          AI Powered Fraud Detection System
        </h2>

        {/* DESCRIPTION */}

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: "32px",
            marginBottom: "40px"
          }}
        >
          Monitor suspicious transactions, detect fraud
          in real-time, analyze transaction risks and
          secure financial systems using AI-driven analytics.
        </p>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          <Link to="/login">

            <button style={primaryBtn}>
              Login
            </button>

          </Link>


        </div>

        {/* FEATURES */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "80px",
            flexWrap: "wrap"
          }}
        >

          <div style={card}>
            <h3>⚡ Real-Time Detection</h3>
            <p style={cardText}>
              Instantly detect suspicious activity
            </p>
          </div>

          <div style={card}>
            <h3>📊 Analytics Dashboard</h3>
            <p style={cardText}>
              Visualize fraud insights with charts
            </p>
          </div>

          <div style={card}>
            <h3>🔐 Secure Monitoring</h3>
            <p style={cardText}>
              Protect transactions with AI monitoring
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}

const primaryBtn = {

  padding: "15px 35px",
  border: "none",
  borderRadius: "12px",
  background: "#38bdf8",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 20px rgba(56,189,248,0.4)"

};

const secondaryBtn = {

  padding: "15px 35px",
  borderRadius: "12px",
  border: "1px solid #38bdf8",
  background: "transparent",
  color: "#38bdf8",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold"

};

const card = {

  width: "250px",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)"

};

const cardText = {

  color: "#94a3b8",
  marginTop: "10px"

};

export default Home;
