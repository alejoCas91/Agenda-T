import { useState } from "react";
import { authApi } from "../../data/apis/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await authApi.login(email, password);

      window.location.href = "/services";
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
