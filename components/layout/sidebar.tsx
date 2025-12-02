"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/live-posture", label: "Live Posture", icon: "📍" },
  { href: "/exercises", label: "Exercises", icon: "💪" },
  { href: "/tips", label: "Tips", icon: "💡" },
  { href: "/history", label: "History", icon: "📈" },
  { href: "/notifications", label: "Notifications", icon: "🔔" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-screen sticky top-0 pt-4">
        <nav className="flex-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                pathname === item.href ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around z-40 safe-area-inset-bottom">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors ${
              pathname === item.href ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
