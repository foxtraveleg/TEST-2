import type React from "react"
interface SettingsSectionProps {
  title: string
  icon: string
  children: React.ReactNode
}

export default function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  )
}
