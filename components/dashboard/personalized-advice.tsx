interface AdviceItem {
  title: string
  description: string
}

interface PersonalizedAdviceProps {
  advice: {
    riskLevel: string
    exercises: AdviceItem[]
    tips: AdviceItem[]
  }
}

export default function PersonalizedAdvice({ advice }: PersonalizedAdviceProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-50 border-green-200 text-green-700"
      case "Medium":
        return "bg-orange-50 border-orange-200 text-orange-700"
      case "High":
        return "bg-red-50 border-red-200 text-red-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Low":
        return "✅"
      case "Medium":
        return "⚠️"
      case "High":
        return "🚨"
      default:
        return "ℹ️"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Risk Level */}
      <div className={`rounded-lg border p-6 ${getRiskColor(advice.riskLevel)}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{getRiskIcon(advice.riskLevel)}</span>
          <h3 className="font-semibold">Current Risk Level</h3>
        </div>
        <p className="text-sm font-bold">{advice.riskLevel}</p>
        <p className="text-xs opacity-75 mt-2">Based on your recent posture data</p>
      </div>

      {/* Recommended Exercises */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>💪</span> Recommended Exercises
        </h3>
        <ul className="space-y-3">
          {advice.exercises.map((ex, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-medium text-gray-900">{ex.title}</p>
              <p className="text-gray-600 text-xs">{ex.description}</p>
            </div>
          ))}
        </ul>
      </div>

      {/* Medical Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>💡</span> Medical Tips
        </h3>
        <ul className="space-y-3">
          {advice.tips.map((tip, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-medium text-gray-900">{tip.title}</p>
              <p className="text-gray-600 text-xs">{tip.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
