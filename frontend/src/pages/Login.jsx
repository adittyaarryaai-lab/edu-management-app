import { useState } from "react";
import api from "../api/axios";
import { saveAuth } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      saveAuth(res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
