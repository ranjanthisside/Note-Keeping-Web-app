import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="loginContainer" style={{ padding: 20 }}>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button className="homepageButton" type="submit">Signup</button>
        <p className="redirectText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      <div className="loginRight">
        <p>save your thoughs before they're lost again !!</p>
        <p id="nameText">notes app by <br /> <b> Prabhakar</b> </p>
      </div>
      <p className="Copyright">2026 Prabhakar Ranjan. Copyright, All rights reserved</p>

      
    </div>
  );
}
