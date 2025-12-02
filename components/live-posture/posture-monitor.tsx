"use client"

import { useState, useEffect } from "react"

interface MetricValue {
  label: string
  value: number
  unit: string
  min: number
  max: number
  optimal: [number, number]
}

export default function PostureMonitor() {
  const [metrics, setMetrics] = useState<MetricValue[]>([
    { label: "Spine Angle", value: 0, unit: "°", min: 0, max: 40, optimal: [0, 15] },
    { label: "Belt Temperature", value: 36, unit: "°C", min: 20, max: 50, optimal: [35, 37] },
    { label: "Signal Strength", value: 85, unit: "%", min: 0, max: 100, optimal: [80, 100] },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          // Simulate random values
          const newValue = Math.random() * (metric.max - metric.min) + metric.min
          return { ...metric, value: Math.round(newValue * 10) / 10 }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getProgressColor = (value: number, optimal: [number, number]) => {
    if (value >= optimal[0] && value <= optimal[1]) return "bg-green-500"
    if (Math.abs(value - optimal[0]) < 5 || Math.abs(value - optimal[1]) < 5) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {metrics.map((metric, idx) => (
        <div key={idx}>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">{metric.label}</label>
            <span className="text-sm font-semibold text-gray-900">
              {metric.value}
              {metric.unit}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor(metric.value, metric.optimal)} transition-all duration-300`}
              style={{ width: `${((metric.value - metric.min) / (metric.max - metric.min)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>
              {metric.min}
              {metric.unit}
            </span>
            <span className="text-green-600 font-medium">
              Optimal: {metric.optimal[0]}-{metric.optimal[1]}
              {metric.unit}
            </span>
            <span>
              {metric.max}
              {metric.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
