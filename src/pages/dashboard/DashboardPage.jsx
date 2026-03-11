import CourseCard from "../../ui/components/CourseCard";

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "riwi",
      instructor: "santiahgo",
      duration: "3hrs",
      slots: 6,
      maxSlots: 10,
    },
    {
      id: 2,
      title: "censa",
      instructor: "rubt",
      duration: "3hrs",
      slots: 10,
      maxSlots: 10,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          instructor={course.instructor}
          duration={course.duration}
          slots={course.slots}
          maxSlots={course.maxSlots}
          onReserve={() => console.log("reservar")}
        />
      ))}
    </div>
  );
}
