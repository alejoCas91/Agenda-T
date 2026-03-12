import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../data/apis/authApi";
import { supabase } from "../../lib/supabase";
import { sileo } from "sileo";

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!validatePassword(password)) {
      sileo.error(
        "Password must contain uppercase, number and special character",
      );
      return;
    }

    try {
      const user = await authApi.register(email, password);

      await supabase.from("profiles").insert({
        id: user.id,
        email: email,
        role: "client",
      });

      await supabase.from("clients").insert({
        name,
        phone,
        email,
        user_id: user.id,
      });

      sileo.success("Account created");

      navigate("/login");
    } catch (err) {
      console.error(err);

      sileo.error("Error creating account");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-360px flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">AgendaT</h1>

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

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
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-600 font-medium" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
