import { useState } from "react";
import { authApi } from "../../data/apis/authApi";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await authApi.register(email, password);

      alert("Account created");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
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
