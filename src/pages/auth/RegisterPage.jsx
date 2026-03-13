import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import { sileo } from "sileo";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    return regex.test(password);
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!validatePassword(password)) {
      sileo.error({
        title: "Weak password",
        description:
          "Password must contain uppercase, number and special character",
      });

      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const user = data.user;

      await supabase.from("profiles").insert({
        id: user.id,
        email: email,
        role: "client",
      });

      await supabase.from("clients").insert({
        user_id: user.id,
        name,
        email,
      });

      navigate("/dashboard");
    } catch (err) {
      sileo.error({
        title: "Register failed",
        description: err.message,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#7A0C12] via-[#9C1C22] to-[#7A0C12]">
      <div className="bg-white rounded-xl shadow-xl p-8 w-80 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img src={logo} className="w-24 mb-3" />

          <h1 className="text-2xl font-bold text-[#7A0C12]">AgendaT</h1>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

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
            Register
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-[#7A0C12] ml-1 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
