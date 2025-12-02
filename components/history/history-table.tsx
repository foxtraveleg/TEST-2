interface HistoryItem {
  date: string
  score: number
  badTime: number
  alerts: number
}

interface HistoryTableProps {
  history: HistoryItem[]
}

export default function HistoryTable({ history }: HistoryTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 font-bold"
    if (score >= 60) return "text-orange-600 font-bold"
    return "text-red-600 font-bold"
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Posture Score</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Bad Posture Time</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Alerts</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600">{formatDate(item.date)}</td>
              <td className={`py-3 px-4 ${getScoreColor(item.score)}`}>{item.score}/100</td>
              <td className="py-3 px-4 text-gray-600">{item.badTime} minutes</td>
              <td className="py-3 px-4">
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700">
                  {item.alerts}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
