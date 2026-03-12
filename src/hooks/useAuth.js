import { useEffect, useState } from "react";
import { authApi } from "../data/apis/authApi";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const u = await authApi.getUser();
      setUser(u);
    }

    loadUser();
  }, []);

  return { user };
}
