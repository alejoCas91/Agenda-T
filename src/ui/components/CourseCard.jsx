import Button from "./Button";
import useUser from "../../hooks/useUser";

export default function CourseCard({ service, onBook }) {
  const user = useUser();
  return (
    <div className="bg-white border rounded-xl p-4 flex flex-col gap-3">
      <h3 className="font-semibold">{service.name}</h3>

      <p>Duration: {service.duration_minutes} min</p>

      {user.role === "user" && (
        <Button onClick={() => onBook(service)}>Book</Button>
      )}
    </div>
  );
}
