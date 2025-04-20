"use client"
import { useWindows } from "@/context/WindowsContext"

interface DesktopIconProps {
  app: {
    name: string
    icon: string
    isOpen: boolean
    isMinimized: boolean
    isMaximized: boolean
    position: { x: number; y: number }
  }
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const { openApp } = useWindows()

  return (
    <button className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/10" onClick={() => openApp(app)}>
      <span className="text-3xl">{app.icon}</span>
      <span className="text-xs text-center text-white">{app.name}</span>
    </button>
  )
}
