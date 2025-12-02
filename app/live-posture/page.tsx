"use client"

import MainLayout from "@/components/layout/main-layout"
import PostureMonitor from "@/components/live-posture/posture-monitor"
import PostureIndicator from "@/components/live-posture/posture-indicator"
import MonitoringSession from "@/components/live-posture/monitoring-session"
import { useState } from "react"

export default function LivePosturePage() {
  const [isMonitoring, setIsMonitoring] = useState(false)

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Posture Monitor</h1>
          <p className="text-gray-600">Real-time posture tracking from your smart belt</p>
        </div>

        {isMonitoring ? (
          <MonitoringSession onStop={() => setIsMonitoring(false)} />
        ) : (
          <>
            {/* Current Status Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Status</h2>
                <PostureIndicator />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Device Metrics</h2>
                <PostureMonitor />
              </div>
            </div>

            {/* Start Monitoring Button */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 text-center">
              <p className="text-gray-600 mb-6">
                Click below to start real-time monitoring. The system will stream data from your smart belt and alert
                you of any posture issues.
              </p>
              <button
                onClick={() => setIsMonitoring(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Live Monitoring
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}
