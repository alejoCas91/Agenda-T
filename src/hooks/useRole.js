import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function getRole() {
      const { data } = await supabase.auth.getUser();

      const user = data.user;

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(profile?.role);
    }

    getRole();
  }, []);

  return role;
}
