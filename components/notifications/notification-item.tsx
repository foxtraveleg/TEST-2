"use client"

interface Notification {
  id: number
  timestamp: string
  message: string
  type: "alert" | "success" | "warning" | "info"
  read: boolean
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: () => void
}

const typeStyles = {
  alert: { bg: "bg-red-50", border: "border-red-200", icon: "🚨", color: "text-red-700" },
  success: { bg: "bg-green-50", border: "border-green-200", icon: "✅", color: "text-green-700" },
  warning: { bg: "bg-orange-50", border: "border-orange-200", icon: "⚠️", color: "text-orange-700" },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "ℹ️", color: "text-blue-700" },
}

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const style = typeStyles[notification.type]

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div
      className={`rounded-lg border p-4 cursor-pointer transition-all ${style.bg} ${style.border} ${
        !notification.read ? "ring-2 ring-blue-300" : ""
      }`}
      onClick={onMarkAsRead}
    >
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0">{style.icon}</span>
        <div className="flex-1">
          <p className={`font-medium ${style.color}`}>{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
        </div>
        {!notification.read && <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
      </div>
    </div>
  )
}
