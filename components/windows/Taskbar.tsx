"use client"

import React from "react"
import { useWindows } from "@/context/WindowsContext"
import { Search, Volume2, Wifi, Battery, ChevronUp, Cloud, BatteryLow } from "lucide-react"
import Image from "next/image"
import windows from "@/public/icons/windows11_.png"
import { Battery50Icon } from "@heroicons/react/24/outline"

export default function Taskbar() {
  const {
    isStartOpen,
    setIsStartOpen,
    openApps,
    openApp,
    searchTerm,
    setSearchTerm,
    isExtraIconsOpen,
    setIsExtraIconsOpen,
    isTimePopupOpen,
    setIsTimePopupOpen,
    currentTime,
    handleQuickSettingClick,
    enabledSettings,
    batteryPercentage,
  } = useWindows()

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/90 backdrop-blur-xl flex items-center px-4">
      {/* Left section */}
      <div className="flex items-center gap-3 text-white/90 text-sm">
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10">
          <Cloud className="w-4 h-4 text-blue-300" />
          <span>73°F</span>
          <span className="text-white/60">Cloudy</span>
        </div>
      </div>

      {/* Center section */}
      <div className="flex-1 flex justify-center items-center gap-2">
        <button
          className="p-2 rounded hover:bg-white/10 transition-colors"
          onClick={() => setIsStartOpen(!isStartOpen)}
        >
          <Image
          src={windows}
          alt=""
          height={20}
          width={20}
          />
            <path
              fill="currentColor"
              d="M3 3h8v8H3V3m2 2v4h4V5H5m8-2h8v8h-8V3m2 2v4h4V5h-4M3 13h8v8H3v-8m2 2v4h4v-4H5m8-2h8v8h-8v-8m2 2v4h4v-4h-4"
            />
         
        </button>

        <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Type here to search"
            className="bg-white/10 text-white placeholder:text-xs placeholder-white/60 rounded-full py-1 px-3 w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Open app icons */}
        {openApps.map((app) => (
          <button
            key={app.name}
            className={`flex items-center justify-center w-10 h-10 rounded ${
              app.isMinimized ? "bg-white/5" : "bg-white/10"
            } transition-colors`}
            onClick={() => openApp(app)}
            title={app.name}
          >
            <span className="text-xl">{app.icon}</span>
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 text-white/80">
        <button onClick={(e) => handleQuickSettingClick("wifi", e)} className="p-1 hover:bg-white/10 rounded-md">
          <Wifi className={`w-4 h-4 ${enabledSettings.includes("wifi") ? "text-blue-500" : "text-white/60"}`} />
        </button>
        <button onClick={(e) => handleQuickSettingClick("volume", e)} className="p-1 hover:bg-white/10 rounded-md">
          <Volume2 className="w-4 h-4" />
        </button>
        <div className="relative group">
          <button onClick={(e) => handleQuickSettingClick("battery", e)} className="p-1 hover:bg-white/10 rounded-md">
            <BatteryLow className="w-4 h-4" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block">
            {batteryPercentage}%
          </div>
        </div>
        <div
          className="text-sm mr-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors duration-200"
          onClick={() => setIsTimePopupOpen(!isTimePopupOpen)}
        >
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="relative">
          <ChevronUp className="w-4 h-4 cursor-pointer" onClick={() => setIsExtraIconsOpen(!isExtraIconsOpen)} />
          <ExtraIconsMenu />
        </div>
      </div>
    </div>
  )
}

function ExtraIconsMenu() {
  const { isExtraIconsOpen } = useWindows()
  const extraIconsMenuRef = React.useRef<HTMLDivElement>(null)

  if (!isExtraIconsOpen) return null

  return (
    <div
      ref={extraIconsMenuRef}
      className="absolute bottom-full right-0 mb-2 py-2 px-3 bg-gray-900/90 backdrop-blur-xl rounded-md shadow-lg overflow-hidden text-sm border border-white/20"
    >
      <div className="flex flex-col gap-2">
        {[
          { icon: "Globe", label: "Network" },
          { icon: "MessageCircle", label: "Messages" },
          { icon: "Chrome", label: "Browser" },
          { icon: "Languages", label: "Language" },
        ].map((item, index) => {
          const IconComponent = require("lucide-react")[item.icon]
          return (
            <button
              key={index}
              className="p-2 rounded hover:bg-white/10 w-full flex items-center justify-center"
              title={item.label}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
