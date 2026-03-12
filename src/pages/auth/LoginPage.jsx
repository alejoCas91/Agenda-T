import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../data/apis/authApi";
import { sileo } from "sileo";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await authApi.login(email, password);

      sileo.success("Welcome to AgendaT");

      navigate("/dashboard");
    } catch {
      sileo.error("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-360px flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">AgendaT</h1>

        <p className="text-sm text-gray-500 text-center">
          Manage your courses and bookings
        </p>

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border rounded-lg px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white py-2 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link className="text-blue-600 font-medium" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
