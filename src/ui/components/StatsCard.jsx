import { ArrowUpRight } from "lucide-react"

export default function StatsCard({ title, value, icon: Icon, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600"
  }
  return (
    <div className="
      bg-white
      border
      border-gray-200
      rounded-xl
      p-6
      shadow-sm
      hover:shadow-md
      transition
      flex
      justify-between
      items-center
    ">
      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      </div>
      <div className={`
        w-12 h-12
        flex
        items-center
        justify-center
        rounded-lg
        ${colors[color]}
      `}>
        {Icon && <Icon size={22} />}
      </div>
    </div>
  )
}