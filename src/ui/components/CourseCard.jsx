import { supabase } from "../../lib/supabase";
import Button from "./Button";
import useRole from "../../hooks/useRole";
import { sileo } from "sileo";

export default function CourseCard({ service }) {
  const { role } = useRole();

  if (!service) return null;

  async function handleBook() {
    try {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      const { data: client } = await supabase
        .from("clients")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!client) {
        throw new Error("Client not found");
      }

      const { error } = await supabase
        .from("appointments")
        .insert({
          client_id: client.id,
          service_id: service.id,
          user_id: user.id,
          date_time: new Date(),
          status: "scheduled",
        })
        .select();

      if (error) throw error;

      sileo.success({
        title: "Course reserved",
        description: "You are now enrolled",
      });
    } catch (err) {
      console.log(err);

      sileo.error({
        title: "Booking Failed",
        description: err.message,
      });
    }
  }

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{service.name}</h3>

      <p className="text-sm text-gray-500">
        Duration: {service.duration_minutes} minutes
      </p>

      <p className="text-sm text-gray-500">
        Price: ${service.price_cents / 100}
      </p>

      {role === "client" && service.status === "approved" && (
        <Button onClick={handleBook}>Reserve Course</Button>
      )}
    </div>
  );
}
