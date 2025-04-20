"use client"

import { useRef } from "react"
import { useWindows } from "@/context/WindowsContext"
import { Wifi, Bluetooth, Plane, Moon, Sun, Settings, Volume2, Battery } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export default function QuickSettings() {
  const {
    isQuickSettingsOpen,
    brightness,
    setBrightness,
    volume,
    setVolume,
    batteryPercentage,
    enabledSettings,
    setEnabledSettings,
  } = useWindows()

  const quickSettingsRef = useRef<HTMLDivElement>(null)

  if (!isQuickSettingsOpen) return null

  return (
    <div
      ref={quickSettingsRef}
      className="fixed bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
      style={{
        right: "223px", // Adjust this value as needed to fine-tune the horizontal position
        bottom: "60px", // Adjust this value to set the distance from the bottom of the screen
      }}
    >
      <div className="p-4 w-80">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { id: "wifi", icon: Wifi },
            { id: "bluetooth", icon: Bluetooth },
            { id: "airplane", icon: Plane },
            { id: "energy", icon: Moon },
            { id: "night", icon: Sun },
            { id: "accessibility", icon: Settings },
          ].map((setting) => {
            const IconComponent = setting.icon
            return (
              <button
                key={setting.id}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                  enabledSettings.includes(setting.id) ? "bg-purple-500/20" : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() =>
                  setEnabledSettings((prev) =>
                    prev.includes(setting.id) ? prev.filter((s) => s !== setting.id) : [...prev, setting.id],
                  )
                }
              >
                <IconComponent
                  className={`w-5 h-5 mb-1 ${enabledSettings.includes(setting.id) ? "text-purple-500" : "text-white/60"}`}
                />
                <span className="text-xs capitalize">{setting.id}</span>
              </button>
            )
          })}
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-white/60" />
            <Slider
              defaultValue={[brightness]}
              max={100}
              step={1}
              onValueChange={(value) => setBrightness(value[0])}
              className="w-full"
            />
            <span className="text-xs w-8 text-right">{brightness}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-white/60" />
            <Slider
              defaultValue={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="w-full"
            />
            <span className="text-xs w-8 text-right">{volume}%</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-white/60" />
          <span className="text-sm">{batteryPercentage}%</span>
        </div>
        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
