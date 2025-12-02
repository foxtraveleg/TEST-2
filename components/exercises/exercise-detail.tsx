"use client"

interface Exercise {
  id: number
  name: string
  category: string
  difficulty: string
  description: string
  duration: number
  reps: string
  instructions: string[]
}

interface ExerciseDetailProps {
  exercise: Exercise
  isCompleted: boolean
  onMarkDone: () => void
  onBack: () => void
}

export default function ExerciseDetail({ exercise, isCompleted, onMarkDone, onBack }: ExerciseDetailProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full">
      {/* Back Button */}
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
        ← Back to Exercises
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{exercise.name}</h1>
            <p className="text-gray-600">{exercise.description}</p>
          </div>
          {isCompleted && <span className="text-5xl">✅</span>}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200 my-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Difficulty</p>
            <p className="font-semibold text-gray-900">{exercise.difficulty}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Duration</p>
            <p className="font-semibold text-gray-900">{exercise.duration} minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-semibold text-gray-900">{exercise.category}</p>
          </div>
        </div>

        {/* Reps */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
          <p className="text-sm text-blue-600 mb-1">Recommended Repetitions</p>
          <p className="font-semibold text-blue-900">{exercise.reps}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={onMarkDone}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isCompleted ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isCompleted ? "Completed ✅" : "Mark as Done"}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Instructions</h2>
        <div className="space-y-4">
          {exercise.instructions.map((instruction, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="font-semibold text-blue-600">{idx + 1}</span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-gray-700">{instruction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-green-50 rounded-lg border border-green-200 p-6 mt-8">
          <h3 className="font-semibold text-green-900 mb-2">Tips for Better Results</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Move slowly and controlled, avoiding jerky motions</li>
            <li>• Breathe steadily throughout the exercise</li>
            <li>• Stop if you experience pain</li>
            <li>• Consistency is key - perform regularly for best results</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
