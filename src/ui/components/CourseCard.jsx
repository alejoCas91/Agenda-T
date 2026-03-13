import { supabase } from "../../lib/supabase";
import useRole from "../../hooks/useRole";
import { sileo } from "sileo";

export default function CourseCard({ service }) {
  const { role } = useRole();

  if (!service) return null;

  async function handleBook() {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      let { data: client } = await supabase
        .from("clients")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!client) {
        const { data: newClient, error: createError } = await supabase
          .from("clients")
          .insert({
            user_id: user.id,
            name: user.email,
            email: user.email,
          })
          .select()
          .single();

        if (createError) throw createError;

        client = newClient;
      }

      const { data: existing } = await supabase
        .from("appointments")
        .select("id")
        .eq("client_id", client.id)
        .eq("service_id", service.id);

      if (existing?.length > 0) {
        sileo.error({
          title: "Already enrolled",
          description: "You are already enrolled in this course",
        });

        return;
      }

      const { error } = await supabase.from("appointments").insert({
        client_id: client.id,
        service_id: service.id,
        user_id: user.id,
        date_time: new Date(),
        status: "scheduled",
      });

      if (error) throw error;

      sileo.success({
        title: "Course reserved",
        description: "You have successfully enrolled",
      });
    } catch (err) {
      console.error(err);

      sileo.error({
        title: "Booking failed",
        description: err.message,
      });
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{service.name}</h3>

      <p className="text-gray-500 text-sm">
        Duration: {service.duration_minutes} minutes
      </p>

      <p className="text-gray-500 text-sm">
        Price: ${service.price_cents / 100}
      </p>

      {role === "client" && service.status === "approved" && (
        <button
          onClick={handleBook}
          className="bg-[#7A0C12] text-white rounded-lg py-2 mt-2 hover:bg-[#9C1C22]"
        >
          Reserve Course
        </button>
      )}
    </div>
  );
}
