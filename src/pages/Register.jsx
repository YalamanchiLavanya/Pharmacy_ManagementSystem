import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const email = user.email.trim().toLowerCase();

      /* ADMIN EMAIL CHECK */

      if (
        selectedRole === "ADMIN" &&
        email !== "admin@medicare.com" &&
        email !== "administrator@medicare.com"
      ) {
        alert(
          "Administrator registration is allowed only with an authorized administrator email."
        );
        return;
      }

      /* CHECK EXISTING EMAIL */

      const existingUsers = await api.get("/users", {
        params: {
          email: email
        }
      });

      if (existingUsers.data.length > 0) {
        alert(
          "This email is already registered. Please login."
        );

        navigate("/login");

        return;
      }

      /* CREATE USER */

      await api.post("/users", {
        name: user.name,
        email: email,
        password: user.password,
        role: selectedRole
      });

      alert(
        selectedRole === "ADMIN"
          ? "Administrator registration successful!"
          : "User registration successful!"
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert("Registration failed");
    }
  }

  /* ROLE SELECTION */

  if (!selectedRole) {
    return (
      <div className="auth-container">

        <div className="auth-card">

          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Choose account type
          </p>

          <button
            className="auth-btn"
            onClick={() => setSelectedRole("USER")}
          >
            👤 Register as User
          </button>

          <button
            className="auth-btn"
            onClick={() => setSelectedRole("ADMIN")}
          >
            👨‍💼 Register as Administrator
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>
    );
  }

  /* REGISTRATION FORM */

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>
          {selectedRole === "ADMIN"
            ? "Administrator Registration"
            : "User Registration"}
        </h1>

        <p className="auth-subtitle">
          Create your MediCare Pharmacy account
        </p>

        {selectedRole === "ADMIN" && (
          <p
            style={{
              color: "#d32f2f",
              fontSize: "13px",
              marginBottom: "15px",
              textAlign: "center"
            }}
          >
            Authorized admin emails:
            <br />
            admin@medicare.com
            <br />
            administrator@medicare.com
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>

        </form>

        <button
          className="back-role-btn"
          onClick={() => setSelectedRole("")}
        >
          ← Choose Different Account
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;