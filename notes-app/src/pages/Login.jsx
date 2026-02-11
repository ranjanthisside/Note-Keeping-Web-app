import {useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                // store token
                localStorage.setItem("token",data.token);

                // go to notes page
                navigate("/");
            }else{
                alert(data.message);
            }
        }catch(err){
            alert("Server error");
        }
    };

    return (
    <div className="loginContainer" style={{ padding: 20 }}>
      

      <form id="loginForm" onSubmit={handleLogin}>
        <h2>Login</h2>
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

        <button className="homepageButton" type="submit">Login</button>
        <p className="redirectText">
        Don’t have an account? <Link to="/signup">Signup</Link>
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