import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { sileo } from "sileo";

export default function BossCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      if (!user) {
        console.log("No user found");
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select(
          `
            id,
            name,
            appointments (
              id,
              clients (
                id,
                name,
                email
              )
            )
          `,
        )
        .eq("user_id", user.id);

      if (error) {
        console.log("QUERY ERROR:", error);
        throw error;
      }

      console.log("COURSES:", data);

      setCourses(data || []);
    } catch (err) {
      console.log(err);

      sileo.error({
        title: "Failed to load courses",
      });
    }

    setLoading(false);
  }

  async function removeClient(appointmentId) {
    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId);

      if (error) throw error;

      setCourses((prev) =>
        prev.map((course) => ({
          ...course,
          appointments: course.appointments?.filter(
            (a) => a.id !== appointmentId,
          ),
        })),
      );

      sileo.success({
        title: "Client removed",
      });
    } catch {
      sileo.error({
        title: "Failed to remove client",
      });
    }
  }

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">My Courses</h1>

      {courses.length === 0 && <p>No courses found</p>}

      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded-xl p-4 flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold">{course.name}</h2>

          {course.appointments?.length === 0 && (
            <p className="text-sm text-gray-500">No clients enrolled</p>
          )}

          {course.appointments?.map((app) => (
            <div
              key={app.id}
              className="flex justify-between items-center border rounded-lg p-2"
            >
              <div>
                <p className="font-semibold">{app.clients?.name}</p>

                <p className="text-sm text-gray-500">{app.clients?.email}</p>
              </div>

              <button
                onClick={() => removeClient(app.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
