import useAppointments from "../../hooks/useAppointments";
import useRole from "../../hooks/useRole";
import { sileo } from "sileo";

export default function CourseCard({ service }) {
  const { role } = useRole();

  const { createAppointment } = useAppointments();

  if (!service) return null;

  async function handleBook() {
    try {
      await createAppointment(service);

      sileo.success({
        title: "Course reserved",
      });
    } catch (err) {
      sileo.error({
        title: "Booking failed",
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
        <button
          onClick={handleBook}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Reserve Course
        </button>
      )}
    </div>
  );
}
