"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Good Posture", value: 600, color: "#10b981" },
  { name: "Bad Posture", value: 300, color: "#ef4444" },
  { name: "Inactive", value: 540, color: "#d1d5db" },
]

export default function PostureTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${Math.round(value / 60)} min`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
