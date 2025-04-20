"use client"

import type React from "react"
import { useWindows } from "@/context/WindowsContext"
import { useWindowDrag } from "@/hooks/useWindowDrag"
import { Minus, Maximize2, X } from "lucide-react"
import Portfolio from "@/components/ui/portfolio"
import Notepad from "@/components/ui/Notepad"
import Calculator from "@/components/ui/Calculator"
import Weather from "@/components/ui/weather"
import SpaceGame from "@/components/ui/memory-game"
import {  Square3Stack3DIcon} from '@heroicons/react/24/outline';


interface WindowManagerProps {
  computerWindowRef: React.RefObject<HTMLDivElement>
}

export default function WindowManager({ computerWindowRef }: WindowManagerProps) {
  const { openApps, activeWindow, setActiveWindow, minimizeApp, toggleMaximizeApp, closeApp } = useWindows()

  const { handleMouseDown } = useWindowDrag()

  return (
    <>
      {openApps.map((app) => (
        <div
          key={app.name}
          className={`absolute bg-gray-800/90 backdrop-blur-xl text-white shadow-2xl overflow-hidden flex flex-col
                      transition-all duration-100 ease-out rounded-lg
                      ${app.isMinimized ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
                      ${activeWindow === app.name ? "z-10" : "z-0"}
                      ${
                        app.isMaximized
                          ? "left-0 right-0 top-0 bottom-12 rounded-none"
                          : app.name === "Calculator"
                            ? "w-[300px] h-[400px]"
                            : "w-[80%] h-[80%] max-w-4xl max-h-[600px]"
                      }`}
          style={
            !app.isMaximized
              ? {
                  left: `${app.position.x}px`,
                  top: `${app.position.y}px`,
                }
              : undefined
          }
          onMouseDown={(e) => {
            handleMouseDown(e, app.name)
            setActiveWindow(app.name)
          }}
        >
          <div className="flex justify-between items-center p-2 bg-gray-700/50">
            <div className="flex items-center gap-2 ml-1">
              <span className="text-sm font-semibold">{app.name}</span>
            </div>
            <div className="flex items-center gap-1 window-controls">
              <button onClick={() => minimizeApp(app)} className="p-1 hover:bg-gray-600/80 transition-colors rounded">
                <Minus className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={() => toggleMaximizeApp(app)}
                className="p-1 hover:bg-gray-600/80 transition-colors rounded"
              >
                <Square3Stack3DIcon className="w-4 h-4 text-gray-300" />
              </button>
              <button onClick={() => closeApp(app)} className="p-1 hover:bg-red-500 transition-colors rounded">
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-full overflow-auto scrollbar-hide">
            {app.name === "Portfolio" ? (
              <Portfolio />
            ) : app.name === "Notepad" ? (
              <Notepad />
            ) : app.name === "Memorytest" ? (
              <SpaceGame />
            ) : app.name === "Calculator" ? (
              <Calculator />
            ) : app.name === "Weather" ? (
              <Weather />
            ) : (
              <p className="text-sm">Content for {app.name}</p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
