"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import NotificationItem from "@/components/notifications/notification-item"
import mockData from "@/data/mockData.json"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockData.notifications)

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  // Separate read and unread
  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New</h2>
            <div className="space-y-3">
              {unreadNotifications.map((notif) => (
                <NotificationItem key={notif.id} notification={notif} onMarkAsRead={() => handleMarkAsRead(notif.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Earlier</h2>
            <div className="space-y-3">
              {readNotifications.map((notif) => (
                <NotificationItem key={notif.id} notification={notif} onMarkAsRead={() => handleMarkAsRead(notif.id)} />
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notifications yet</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
