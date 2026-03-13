import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import { sileo } from "sileo";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      sileo.error({
        title: "Login failed",
        description: error.message,
      });

      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#7A0C12] via-[#9C1C22] to-[#7A0C12]">
      <div className="bg-white rounded-xl shadow-xl p-8 w-80 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img src={logo} className="w-24 mb-3" />

          <h1 className="text-2xl font-bold text-[#7A0C12]">AgendaT</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button className="bg-[#7A0C12] text-white rounded-lg py-2 hover:bg-[#9C1C22]">
            Login
          </button>
        </form>

        <p className="text-sm text-center">
          Don't have an account?
          <Link to="/register" className="text-[#7A0C12] ml-1 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
