"use client"

interface Exercise {
  id: number
  name: string
  category: string
  difficulty: string
  description: string
  duration: number
}

interface ExerciseCardProps {
  exercise: Exercise
  isCompleted: boolean
  onSelect: () => void
  onMarkDone: () => void
}

const difficultyColors = {
  Easy: "bg-green-50 text-green-700",
  Medium: "bg-orange-50 text-orange-700",
  Hard: "bg-red-50 text-red-700",
}

const categoryIcons: Record<string, string> = {
  Posture: "📍",
  Flexibility: "🧘",
  "Pain Relief": "💊",
}

export default function ExerciseCard({ exercise, isCompleted, onSelect, onMarkDone }: ExerciseCardProps) {
  return (
    <div
      className={`rounded-lg border shadow-sm overflow-hidden transition-all ${
        isCompleted ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcons[exercise.category]}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
              <p className="text-xs text-gray-500">{exercise.category}</p>
            </div>
          </div>
          {isCompleted && <span className="text-2xl">✅</span>}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>

        {/* Difficulty & Duration */}
        <div className="flex gap-2 mb-4">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              difficultyColors[exercise.difficulty as keyof typeof difficultyColors]
            }`}
          >
            {exercise.difficulty}
          </span>
          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
            {exercise.duration} min
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onSelect}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onMarkDone}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isCompleted ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isCompleted ? "Done" : "Mark Done"}
          </button>
        </div>
      </div>
    </div>
  )
}
