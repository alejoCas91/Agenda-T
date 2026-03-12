import { useState } from "react";
import { authApi } from "../../data/apis/authApi";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function handleRegister() {
    try {
      const { user } = await authApi.register(email, password);

      await supabase.from("clients").insert({
        name,
        phone,
        email,
        user_id: user.id,
      });

      alert("Account created");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
