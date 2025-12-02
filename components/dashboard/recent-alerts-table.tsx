interface Alert {
  id: number
  time: string
  type: string
  status: string
  message: string
}

interface RecentAlertsTableProps {
  alerts: Alert[]
}

export default function RecentAlertsTable({ alerts }: RecentAlertsTableProps) {
  const getStatusColor = (status: string) => {
    return status === "Resolved" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
  }

  const getTypeColor = (type: string) => {
    return type === "Bad Posture" ? "bg-red-100" : "bg-orange-100"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600">{alert.time}</td>
              <td className="py-3 px-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(alert.type)}`}>
                  {alert.type}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{alert.message}</td>
              <td className="py-3 px-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
