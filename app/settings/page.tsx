"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import SettingsSection from "@/components/settings/settings-section"
import mockData from "@/data/mockData.json"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    beltId: mockData.user.beltId,
    liveMonitoring: true,
    appNotifications: true,
    vibrationAlerts: false,
    language: "en",
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    // Save settings (in production, send to API)
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your preferences and device configuration</p>
        </div>

        {/* Device Settings */}
        <SettingsSection title="Device Settings" icon="⚙️">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Belt Device ID</label>
              <input
                type="text"
                value={settings.beltId}
                onChange={(e) => handleInputChange("beltId", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your smart belt's ID or Wi-Fi name</p>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Live Monitoring</p>
                <p className="text-sm text-gray-600">Enable real-time posture tracking</p>
              </div>
              <button
                onClick={() => handleToggle("liveMonitoring")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.liveMonitoring ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.liveMonitoring ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection title="Notifications" icon="🔔">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">App Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts and updates</p>
              </div>
              <button
                onClick={() => handleToggle("appNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appNotifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Vibration Alerts</p>
                <p className="text-sm text-gray-600">Haptic feedback for posture alerts (future)</p>
              </div>
              <button
                onClick={() => handleToggle("vibrationAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.vibrationAlerts ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.vibrationAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Language Settings */}
        <SettingsSection title="Language" icon="🌐">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Choose Language</label>
            <div className="flex gap-4">
              <button
                onClick={() => handleInputChange("language", "en")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  settings.language === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleInputChange("language", "ar")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  settings.language === "ar" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                العربية (Arabic)
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Note: Full Arabic localization will be added in future updates</p>
          </div>
        </SettingsSection>

        {/* Profile Settings */}
        <SettingsSection title="Profile" icon="👤">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue={mockData.user.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={mockData.user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
            </div>
          </div>
        </SettingsSection>

        {/* Save Button */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Reset
          </button>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚠️</span> Danger Zone
          </h2>
          <button className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </MainLayout>
  )
}
