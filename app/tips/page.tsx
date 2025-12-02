"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import TipsSection from "@/components/tips/tips-section"
import mockData from "@/data/mockData.json"

export default function TipsPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const tips = mockData.tips

  // Group tips by category
  const groupedTips = tips.reduce(
    (acc, tip) => {
      if (!acc[tip.category]) {
        acc[tip.category] = []
      }
      acc[tip.category].push(tip)
      return acc
    },
    {} as Record<string, typeof tips>,
  )

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const categoryIcons: Record<string, string> = {
    "General Posture": "📍",
    "Office Work": "💼",
    "Standing & Walking": "🚶",
    "Pain Relief": "💊",
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical & Posture Tips</h1>
          <p className="text-gray-600">Expert advice to improve your posture and prevent pain</p>
        </div>

        {/* Tips by Category */}
        <div className="space-y-4">
          {Object.entries(groupedTips).map(([category, categoryTips]) => (
            <TipsSection
              key={category}
              category={category}
              icon={categoryIcons[category] || "💡"}
              tips={categoryTips}
              isExpanded={expandedCategories.includes(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))}
        </div>

        {/* General Advice */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Practice good ergonomics at your workspace</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Take regular breaks every 30 minutes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Exercise regularly to strengthen your core</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Use your smart belt to monitor and correct posture</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Stay hydrated and maintain a healthy lifestyle</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}
