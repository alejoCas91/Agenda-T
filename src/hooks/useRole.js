import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role || "client");
      setLoading(false);
    }

    fetchRole();
  }, []);

  return { role, loading };
}
