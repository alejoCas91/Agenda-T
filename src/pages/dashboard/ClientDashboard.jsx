import CourseCard from "../../ui/components/CourseCard";
import useServices from "../../hooks/useServices";

export default function ClientDashboard() {
  const { services, loading } = useServices();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const approved = services.filter((service) => service.status === "approved");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Available Courses</h1>

      {approved.length === 0 && <p>No courses available</p>}

      <div className="grid grid-cols-3 gap-6">
        {approved.map((service) => (
          <CourseCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
