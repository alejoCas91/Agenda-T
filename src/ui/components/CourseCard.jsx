import Button from "./Button"
import Badge from "./Badge"

export default function CourseCard() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      
      <div className="h-40 bg-gray-200"/>

      <div className="p-4 flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">
            aasd
          </h3>
          <Badge>asd</Badge>
        </div>

        <p className="text-sm text-gray-500">
          asd asd
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>ajs 0 / 0</span>
          <span>00:00</span>
        </div>

        <Button>
          ajsd
        </Button>

      </div>
    </div>
  )
}