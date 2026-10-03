import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.get("/users", {
        params: {
          email: email.trim().toLowerCase(),
          password: password,
          role: selectedRole
        }
      });

      if (response.data.length > 0) {
        const loggedInUser =
          response.data[0];

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        alert(
          selectedRole === "ADMIN"
            ? "Administrator login successful!"
            : "User login successful!"
        );

        navigate("/");

        window.location.reload();
      } else {
        alert(
          `Invalid ${
            selectedRole === "ADMIN"
              ? "Administrator"
              : "User"
          } email or password`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  if (!selectedRole) {
    return (
      <div className="auth-container">

        <div className="auth-card">

          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Choose your account type
          </p>

          <button
            className="auth-btn"
            onClick={() =>
              setSelectedRole("USER")
            }
          >
            👤 User Login
          </button>

          <button
            className="auth-btn"
            onClick={() =>
              setSelectedRole("ADMIN")
            }
          >
            👨‍💼 Administrator Login
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>
          {selectedRole === "ADMIN"
            ? "Administrator Login"
            : "User Login"}
        </h1>

        <p className="auth-subtitle">
          Login to MediCare Pharmacy
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <button
          className="back-role-btn"
          onClick={() =>
            setSelectedRole("")
          }
        >
          ← Choose Different Account
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;