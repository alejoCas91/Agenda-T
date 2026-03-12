import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BossDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("boss_id", user.id);

      setServices(data);
    }

    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">My Services</h2>

      {services.map((service) => (
        <div key={service.id} className="border p-4 mt-3">
          <p>{service.name}</p>
          <p>Status: {service.status}</p>
        </div>
      ))}
    </div>
  );
}
