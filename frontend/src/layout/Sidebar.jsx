import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div
      style={{
        width: "220px",
        maxWidth: "100%",
        height: "100vh",
        background: "#0b1220",
        color: "white",
        padding: "20px",
        position: "fixed"
      }}
    >

      <h2 style={{ color: "#38bdf8" }}>
        FinGuard 🔐
      </h2>

      <nav
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >

        <Link
  to="/dashboard"
  style={{
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    background: "#111827"
  }}
>
          Dashboard
        </Link>

        <Link to="/transactions"  style={{
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    background: "#111827"
  }}
>
          Transactions
        </Link>

        <Link to="/analytics"  style={{
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    background: "#111827"
  }}
>
          Analytics
        </Link>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </nav>

    </div>

  );
}

export default Sidebar;
