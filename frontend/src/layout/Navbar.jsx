import { FiBell, FiUser } from "react-icons/fi";

function Navbar() {

  return (

    <div
      style={{
        height: "70px",
        background: "#111827",
        borderRadius: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        marginBottom: "30px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)"
      }}
    >

      <div>

        <h2 style={{ color: "white" }}>
          Welcome Back Vishal 👋
        </h2>

        <p style={{ color: "#94a3b8" }}>
          Real-time Fraud Monitoring
        </p>

      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          color: "white",
          fontSize: "22px"
        }}
      >

        <FiBell />

        <FiUser />

      </div>

    </div>

  );
}

export default Navbar;

