interface StatCardProps {
  title: string
  value: number
  unit: string
  icon: string
  color: "blue" | "orange" | "red" | "green"
}

const colorClasses = {
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  red: "bg-red-50 border-red-200 text-red-700",
  green: "bg-green-50 border-green-200 text-green-700",
}

export default function StatCard({ title, value, unit, icon, color }: StatCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-sm font-medium opacity-75">{unit}</span>
          </div>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}
