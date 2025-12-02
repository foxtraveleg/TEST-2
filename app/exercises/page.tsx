"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import ExerciseCard from "@/components/exercises/exercise-card"
import ExerciseDetail from "@/components/exercises/exercise-detail"
import mockData from "@/data/mockData.json"

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const exercises = mockData.exercises
  const categories = Array.from(new Set(exercises.map((e) => e.category)))

  const filteredExercises = categoryFilter ? exercises.filter((e) => e.category === categoryFilter) : exercises

  const handleMarkDone = (id: number) => {
    setCompletedExercises((prev) => {
      if (prev.includes(id)) {
        return prev.filter((exId) => exId !== id)
      }
      return [...prev, id]
    })
  }

  if (selectedExercise) {
    const exercise = exercises.find((e) => e.id === selectedExercise)
    if (!exercise) return null

    return (
      <MainLayout>
        <ExerciseDetail
          exercise={exercise}
          isCompleted={completedExercises.includes(exercise.id)}
          onMarkDone={() => handleMarkDone(exercise.id)}
          onBack={() => setSelectedExercise(null)}
        />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercises</h1>
          <p className="text-gray-600">
            Improve your posture with targeted exercises. Completed: {completedExercises.length}/{exercises.length}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoryFilter === null ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoryFilter === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isCompleted={completedExercises.includes(exercise.id)}
              onSelect={() => setSelectedExercise(exercise.id)}
              onMarkDone={() => handleMarkDone(exercise.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
