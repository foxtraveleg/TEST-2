"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import HistoryTable from "@/components/history/history-table"
import mockData from "@/data/mockData.json"

type DateFilter = "day" | "week" | "month"

export default function HistoryPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("week")
  const history = mockData.postureHistory

  const getFilteredHistory = () => {
    const today = new Date()
    const startDate = new Date()

    if (dateFilter === "day") {
      startDate.setDate(today.getDate() - 1)
    } else if (dateFilter === "week") {
      startDate.setDate(today.getDate() - 7)
    } else if (dateFilter === "month") {
      startDate.setMonth(today.getMonth() - 1)
    }

    return history.filter((item) => new Date(item.date) >= startDate)
  }

  const filteredHistory = getFilteredHistory()
  const avgScore = Math.round(filteredHistory.reduce((sum, item) => sum + item.score, 0) / filteredHistory.length)
  const totalBadTime = filteredHistory.reduce((sum, item) => sum + item.badTime, 0)
  const totalAlerts = filteredHistory.reduce((sum, item) => sum + item.alerts, 0)

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posture History</h1>
          <p className="text-gray-600">Track your posture metrics over time</p>
        </div>

        {/* Date Filter */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setDateFilter("day")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dateFilter === "day" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Last Day
          </button>
          <button
            onClick={() => setDateFilter("week")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dateFilter === "week" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Last Week
          </button>
          <button
            onClick={() => setDateFilter("month")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dateFilter === "month" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Last Month
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Average Score</p>
            <p className="text-3xl font-bold text-blue-600">{avgScore}/100</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Total Bad Posture Time</p>
            <p className="text-3xl font-bold text-orange-600">{totalBadTime} mins</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Total Alerts</p>
            <p className="text-3xl font-bold text-red-600">{totalAlerts}</p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed History</h2>
          <HistoryTable history={filteredHistory} />
        </div>
      </div>
    </MainLayout>
  )
}
