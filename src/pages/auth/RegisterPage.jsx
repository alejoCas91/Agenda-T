import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
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

      /* crear perfil */

      await supabase.from("profiles").insert({
        id: user.id,
        role: "client",
      });

      /* crear cliente */

      await supabase.from("clients").insert({
        user_id: user.id,
        name: name,
        email: email,
      });

      sileo.success({
        title: "Account created",
        description: "Welcome to AgendaT",
      });

      navigate("/dashboard");
    } catch (err) {
      const message = err?.message || "Unexpected error";

      sileo.error({
        title: "Register failed",
        description: message,
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />

        <button className="bg-black text-white py-2 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
}
