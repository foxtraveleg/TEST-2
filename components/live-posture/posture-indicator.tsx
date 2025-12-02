"use client"

import { useState, useEffect } from "react"

interface PostureStatus {
  status: "Good" | "Slightly Bad" | "Bad"
  message: string
  color: string
  bgColor: string
}

export default function PostureIndicator() {
  const [posture, setPosture] = useState<PostureStatus>({
    status: "Good",
    message: "Your posture is correct",
    color: "text-green-600",
    bgColor: "bg-green-50",
  })

  useEffect(() => {
    // Simulate data updates every 5 seconds
    const interval = setInterval(() => {
      const statuses: PostureStatus[] = [
        {
          status: "Good",
          message: "Your posture is correct",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          status: "Slightly Bad",
          message: "Your posture could be improved",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          status: "Bad",
          message: "Warning: your posture may harm your spine",
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
      ]

      const randomPosture = statuses[Math.floor(Math.random() * statuses.length)]
      setPosture(randomPosture)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Visual Indicator */}
      <div className="mb-8">
        <div className={`w-24 h-32 rounded-lg ${posture.bgColor} flex items-center justify-center animate-pulse`}>
          <div className="text-center">
            <div
              className={`text-5xl mb-2 ${posture.status === "Good" ? "👍" : posture.status === "Slightly Bad" ? "⚠️" : "🚨"}`}
            ></div>
            <p className={`text-sm font-bold ${posture.color}`}>{posture.status}</p>
          </div>
        </div>
      </div>

      {/* Status Text */}
      <p className={`text-2xl font-bold ${posture.color} text-center mb-4`}>{posture.message}</p>

      {/* Status Badge */}
      <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${posture.bgColor} ${posture.color}`}>
        Status: {posture.status}
      </div>
    </div>
  )
}
