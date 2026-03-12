import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !phone || !email || !password) {
      sileo.error({
        title: "Missing fields",
        description: "All fields are required",
      });
      return;
    }

    if (!validatePassword(password)) {
      sileo.error({
        title: "Weak password",
        description:
          "Password must contain uppercase, number and special character",
      });
      return;
    }

    try {
      setLoading(true);

      // crear usuario en auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const user = data.user;

      if (!user) {
        throw new Error("User creation failed");
      }

      // crear perfil
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: email,
        role: "client",
      });

      if (profileError) throw profileError;

      // crear cliente
      const { error: clientError } = await supabase.from("clients").insert({
        name,
        phone,
        email,
        user_id: user.id,
      });

      if (clientError) throw clientError;

      sileo.success({
        title: "Account created",
        description: "You can now log in",
      });

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      const message =
        err?.error_description || err?.message || "Unexpected error";

      sileo.error({
        title: "Registration failed",
        description: message,
      });
    } finally {
      setLoading(false);
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

        <p className="text-xs text-gray-500">
          Password must contain uppercase, number and special character
        </p>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-black text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
