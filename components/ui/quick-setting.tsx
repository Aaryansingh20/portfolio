"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, Wifi, Battery, Sun, Bluetooth, Plane, Moon, Settings, ChevronUp } from "lucide-react"

export default function QuickSettings() {
  const [showQuickSettings, setShowQuickSettings] = useState(false)
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const quickSettingsRef = useRef<HTMLDivElement>(null)
  const [brightness, setBrightness] = useState(50)
  const [volume, setVolume] = useState(75)
  const [wifiOn, setWifiOn] = useState(true)
  const [bluetoothOn, setBluetoothOn] = useState(false)
  const [airplaneMode, setAirplaneMode] = useState(false)
  const [nightLight, setNightLight] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(event.target as Node)) {
        setShowQuickSettings(false)
        setActiveIcon(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleQuickSettings = (icon: string) => {
    if (activeIcon === icon) {
      setShowQuickSettings(false)
      setActiveIcon(null)
    } else {
      setShowQuickSettings(true)
      setActiveIcon(icon)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseInt(e.target.value))
  }

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number.parseInt(e.target.value))
  }

  const ToggleButton = ({
    isOn,
    onClick,
    icon,
    label,
  }: { isOn: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
    <button
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${isOn ? "bg-purple-500/20 hover:bg-purple-500/30" : "bg-gray-800 hover:bg-gray-700"}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs text-white mt-1">{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/90 backdrop-blur flex items-center justify-end px-4">
        <div className="flex items-center gap-4 text-white/80 relative">
          {/* Volume Icon */}
          <button
            onClick={() => toggleQuickSettings("volume")}
            className="hover:bg-white/10 p-1.5 rounded-md transition-colors relative"
          >
            <Volume2 className="w-4 h-4" />
            {showQuickSettings && activeIcon === "volume" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Volume2 className="w-5 h-5 text-white/60" />
                    <span className="text-sm text-white">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                </div>
              </div>
            )}
          </button>

          {/* Wifi Icon */}
          <button
            onClick={() => toggleQuickSettings("wifi")}
            className="hover:bg-white/10 p-1.5 rounded-md transition-colors relative"
          >
            <Wifi className="w-4 h-4" />
            {showQuickSettings && activeIcon === "wifi" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-4">
                  <button
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${wifiOn ? "bg-blue-500/20 hover:bg-blue-500/30" : "bg-gray-800 hover:bg-gray-700"}`}
                    onClick={() => setWifiOn(!wifiOn)}
                  >
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 mr-3" />
                      <span className="text-sm text-white">TP-Link</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full ${wifiOn ? "bg-blue-500" : "bg-gray-600"} relative`}>
                      <div
                        className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${wifiOn ? "right-0.5" : "left-0.5"}`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </button>

          {/* Battery Icon */}
          <button
            onClick={() => toggleQuickSettings("battery")}
            className="hover:bg-white/10 p-1.5 rounded-md transition-colors relative"
          >
            <Battery className="w-4 h-4" />
            {showQuickSettings && activeIcon === "battery" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Battery className="w-5 h-5 mr-3" />
                      <span className="text-sm text-white">95%</span>
                    </div>
                    <span className="text-xs text-white/60">4 hr 30 min remaining</span>
                  </div>
                </div>
              </div>
            )}
          </button>

          {/* Brightness Icon */}
          <button
            onClick={() => toggleQuickSettings("brightness")}
            className="hover:bg-white/10 p-1.5 rounded-md transition-colors relative"
          >
            <Sun className="w-4 h-4" />
            {showQuickSettings && activeIcon === "brightness" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Sun className="w-5 h-5 text-white/60" />
                    <span className="text-sm text-white">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={handleBrightnessChange}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                </div>
              </div>
            )}
          </button>

          {/* Full Quick Settings Popup */}
          <button
            onClick={() => toggleQuickSettings("full")}
            className="hover:bg-white/10 p-1.5 rounded-md transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          {showQuickSettings && activeIcon === "full" && (
            <div
              ref={quickSettingsRef}
              className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Grid of quick toggles */}
              <div className="grid grid-cols-3 gap-2 p-4">
                <ToggleButton
                  isOn={wifiOn}
                  onClick={() => setWifiOn(!wifiOn)}
                  icon={<Wifi className="w-5 h-5" />}
                  label="Wi-Fi"
                />
                <ToggleButton
                  isOn={bluetoothOn}
                  onClick={() => setBluetoothOn(!bluetoothOn)}
                  icon={<Bluetooth className="w-5 h-5" />}
                  label="Bluetooth"
                />
                <ToggleButton
                  isOn={airplaneMode}
                  onClick={() => setAirplaneMode(!airplaneMode)}
                  icon={<Plane className="w-5 h-5" />}
                  label="Airplane"
                />
                <ToggleButton isOn={false} onClick={() => {}} icon={<Moon className="w-5 h-5" />} label="Energy" />
                <ToggleButton
                  isOn={nightLight}
                  onClick={() => setNightLight(!nightLight)}
                  icon={<Sun className="w-5 h-5" />}
                  label="Night light"
                />
                <ToggleButton
                  isOn={false}
                  onClick={() => {}}
                  icon={<Settings className="w-5 h-5" />}
                  label="Accessibility"
                />
              </div>

              {/* Sliders section */}
              <div className="px-4 py-3 space-y-4">
                {/* Brightness Slider */}
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-white/60" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={handleBrightnessChange}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                </div>
              </div>

              {/* Battery Status */}
              <div className="px-4 py-3 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white">95%</span>
                </div>
                <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

