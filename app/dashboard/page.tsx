"use client"

import MainLayout from "@/components/layout/main-layout"
import StatCard from "@/components/dashboard/stat-card"
import PostureChart from "@/components/dashboard/posture-chart"
import PostureTimeChart from "@/components/dashboard/posture-time-chart"
import RecentAlertsTable from "@/components/dashboard/recent-alerts-table"
import PersonalizedAdvice from "@/components/dashboard/personalized-advice"
import mockData from "@/data/mockData.json"
import { getPersonalizedAdvice } from "@/lib/ai-logic"

export default function DashboardPage() {
  const stats = mockData.todayStats
  const postureData = mockData.postureHistory
  const alerts = mockData.recentAlerts
  const advice = getPersonalizedAdvice(postureData)

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your posture overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Today's Posture Score" value={stats.postureScore} unit="/100" icon="📊" color="blue" />
          <StatCard title="Bad Posture Time" value={stats.badPostureTime} unit="mins" icon="⏱️" color="orange" />
          <StatCard title="Alerts Today" value={stats.alertsCount} unit="alerts" icon="🚨" color="red" />
          <StatCard title="Exercises Done" value={stats.exercisesCompleted} unit="exercises" icon="💪" color="green" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Posture Score Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Posture Score (Last 7 Days)</h2>
              <PostureChart data={postureData} />
            </div>
          </div>

          {/* Good vs Bad Posture */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Breakdown</h2>
              <PostureTimeChart />
            </div>
          </div>
        </div>

        {/* Personalized Advice */}
        <PersonalizedAdvice advice={advice} />

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <RecentAlertsTable alerts={alerts} />
        </div>
      </div>
    </MainLayout>
  )
}
