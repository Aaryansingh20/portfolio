"use client"

import { useRef } from "react"
import { WindowsProvider } from "@/context/WindowsContext"
import Desktop from "./Desktop"
import Taskbar from "./Taskbar"
import WindowManager from "./WindowManager"
import StartMenu from "./StartMenu"
import QuickSettings from "./QuickSettings"
import SystemOverlays from "./SystemOverlays"

export default function ModernWindows() {
  const computerWindowRef = useRef<HTMLDivElement>(null)

  return (
    <WindowsProvider>
      <div className="h-screen bg-gray-900 flex items-center justify-center p-4">
        {/* Screen content */}
        <div
          ref={computerWindowRef}
          className="computer-window w-[95vw] max-w-5xl aspect-[16/10] bg-cover bg-center rounded-lg relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1637937267030-6d571ad57f3f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          {/* Centered arc light effect */}
          <div className="absolute left-0 right-0 bottom-0 h-[80%] bg-gradient-to-t from-blue-500/20 to-transparent rounded-[100%] blur-3xl"></div>

          {/* Desktop */}
          <Desktop />

          {/* Window Manager - handles all open application windows */}
          <WindowManager computerWindowRef={computerWindowRef} />

          {/* Start Menu */}
          <StartMenu />

          {/* Quick Settings Panel */}
          <QuickSettings />

          {/* Taskbar */}
          <Taskbar />

          {/* System Overlays (Lock Screen, Shutdown, Restart, Sleep) */}
          <SystemOverlays />
        </div>
      </div>
    </WindowsProvider>
  )
}
