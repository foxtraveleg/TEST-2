"use client"

import { useState, useEffect } from "react"
import mockData from "@/data/mockData.json"

interface MonitoringSessionProps {
  onStop: () => void
}

interface MonitoringData {
  timestamp: string
  spineAngle: number
  status: string
  alert?: boolean
}

export default function MonitoringSession({ onStop }: MonitoringSessionProps) {
  const [elapsed, setElapsed] = useState(0)
  const [data, setData] = useState<MonitoringData[]>([])
  const [alertCount, setAlertCount] = useState(0)
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => setElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const dataInterval = setInterval(() => {
      const spineAngle = Math.random() * 40
      const status = spineAngle < 15 ? "Good" : spineAngle < 25 ? "Slightly Bad" : "Bad"
      const hasAlert = status === "Bad"

      const newData: MonitoringData = {
        timestamp: new Date().toLocaleTimeString(),
        spineAngle: Math.round(spineAngle * 10) / 10,
        status,
        alert: hasAlert,
      }

      setData((prev) => [...prev.slice(-9), newData])

      if (hasAlert) {
        setAlertCount((prev) => prev + 1)
        const alert = `Alert at ${newData.timestamp}: Bad posture detected (${newData.spineAngle}°)`
        setNotifications((prev) => [alert, ...prev.slice(0, 4)])

        // Add to mock notifications
        const newNotification = {
          id: mockData.notifications.length + 1,
          timestamp: new Date().toISOString(),
          message: `Bad posture detected for monitoring session`,
          type: "alert" as const,
          read: false,
        }
        mockData.notifications.unshift(newNotification)
      }
    }, 2000)

    return () => clearInterval(dataInterval)
  }, [])

  const handleStop = () => {
    // Save to history
    const historyEntry = {
      date: new Date().toISOString().split("T")[0],
      score: Math.max(0, 100 - alertCount * 5),
      badTime: Math.round((elapsed * (alertCount / Math.max(elapsed / 2, 1))) / 60),
      alerts: alertCount,
    }

    // In production, save to localStorage or API
    console.log("Session data:", historyEntry)
    onStop()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-3 gap-6 text-center mb-6">
          <div>
            <p className="text-gray-600 text-sm">Session Duration</p>
            <p className="text-3xl font-bold text-blue-600">{formatTime(elapsed)}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Alerts Detected</p>
            <p className="text-3xl font-bold text-red-600">{alertCount}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Data Points</p>
            <p className="text-3xl font-bold text-gray-900">{data.length}</p>
          </div>
        </div>
        <button
          onClick={handleStop}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Stop Monitoring
        </button>
      </div>

      {/* Real-time Data Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Points */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Real-time Data Points</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.length === 0 ? (
              <p className="text-gray-500 text-sm">Waiting for data...</p>
            ) : (
              data.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-sm ${
                    item.alert
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : item.status === "Slightly Bad"
                        ? "bg-orange-50 border border-orange-200 text-orange-700"
                        : "bg-green-50 border border-green-200 text-green-700"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{item.timestamp}</span>
                    <span>
                      {item.spineAngle}° ({item.status})
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No alerts yet</p>
            ) : (
              notifications.map((notif, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  🚨 {notif}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Monitoring in Progress</h3>
        <p className="text-blue-700 text-sm">
          The system is analyzing your posture in real-time. Keep the belt on and try different positions to see how the
          angle changes. Alerts will be generated when bad posture is detected.
        </p>
      </div>
    </div>
  )
}
