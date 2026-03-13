import CourseCard from "../../ui/components/CourseCard";
import useServices from "../../hooks/useServices";

export default function AdminDashboard() {
  const { services, loading } = useServices();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">All Courses</h1>

      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <CourseCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
