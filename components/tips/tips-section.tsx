"use client"

interface Tip {
  id: number
  title: string
  description: string
  tag: string
}

interface TipsSectionProps {
  category: string
  icon: string
  tips: Tip[]
  isExpanded: boolean
  onToggle: () => void
}

export default function TipsSection({ category, icon, tips, isExpanded, onToggle }: TipsSectionProps) {
  const getTagColor = (tag: string) => {
    return tag === "Prevention" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-gray-900">{category}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tips.length} tips</span>
        </div>
        <span className={`text-xl transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="pb-4 last:pb-0 border-b last:border-b-0 border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${getTagColor(tip.tag)}`}>
                  {tip.tag}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
