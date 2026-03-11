import CourseCard from "../../ui/components/CourseCard"
import Button from "../../ui/components/Button"
import PageHeader from "../../ui/components/PageHeader"

export default function ServicesPage() {

  const fake = [1,2,3,4,5,6]

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="ajsndhajsd"
        description="eurbiasd ajsdhnald"
        action={<Button>asjd</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fake.map((item) => (
          <CourseCard key={item}/>
        ))}
      </div>
    </div>
  )
}