"use client"
import { useWindows } from "@/context/WindowsContext"
import DesktopIcon from "./DesktopIcon"

export default function Desktop() {
  const { desktopApps } = useWindows()

  return (
    <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
      {desktopApps.map((app) => (
        <DesktopIcon key={app.name} app={app} />
      ))}
    </div>
  )
}
