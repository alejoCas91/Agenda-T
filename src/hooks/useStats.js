import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useStats() {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { count: courses } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true });

    const { count: appointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true });

    const { count: clients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    const { count: myCourses } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    const { count: myBookings } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setStats({
      courses,
      appointments,
      clients,
      myCourses,
      myBookings,
    });
  };

  useEffect(() => {
    const fetchStats = async () => {
      await loadStats();
    };
    fetchStats();
  }, []);

  return stats;
}
