"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { useWindows } from "@/context/WindowsContext"
import { Search, Power, Lock } from "lucide-react"

export default function StartMenu() {
  const {
    isStartOpen,
    searchTerm,
    setSearchTerm,
    pinnedApps,
    recommendedItems,
    isPowerMenuOpen,
    setIsPowerMenuOpen,
    setIsLocked,
    setIsSleeping,
    setIsRestarting,
    setIsShutDown,
  } = useWindows()

  const startMenuRef = useRef<HTMLDivElement>(null)
  const powerMenuRef = useRef<HTMLDivElement>(null)

  // Filter apps and items based on search term
  const filteredApps = pinnedApps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredItems = recommendedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isStartOpen) return null

  return (
    <div
      ref={startMenuRef}
      className="absolute left-1/2 -translate-x-1/2 bottom-12 w-[400px] h-[500px] bg-gray-900/90 backdrop-blur-xl rounded-lg border border-white/20 text-white shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Search bar */}
      <div className="p-4">
        <div className="flex items-center gap-3 bg-gray-800/70 rounded-md p-2">
          <Search className="w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Type to search"
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {/* Pinned section */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold">Pinned</h2>
            <button className="text-sm text-white/60 hover:text-white">All apps</button>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {filteredApps.map((app) => (
              <button key={app.name} className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/10">
                <span className="text-xl">{app.icon}</span>
                <span className="text-xs text-center">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended section */}
        {filteredItems.length > 0 && (
          <div className="px-4 pb-4 border-t border-white/10">
            <div className="flex justify-between items-center my-3">
              <h2 className="text-base font-semibold">Recommended</h2>
              <button className="text-sm text-white/60 hover:text-white">More</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filteredItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center gap-3 p-2 rounded hover:bg-white/10 w-full text-left"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div className="overflow-hidden">
                    <div className="text-sm truncate">{item.name}</div>
                    <div className="text-xs text-white/60 truncate">{item.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User section */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">👤</div>
          <span className="text-base">User</span>
        </div>
        <div className="relative">
          <Power
            className="w-5 h-5 text-white/60 hover:text-white cursor-pointer"
            onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
          />
          <PowerMenu
            isPowerMenuOpen={isPowerMenuOpen}
            powerMenuRef={powerMenuRef}
            setIsPowerMenuOpen={setIsPowerMenuOpen}
            setIsLocked={setIsLocked}
            setIsSleeping={setIsSleeping}
            setIsRestarting={setIsRestarting}
            setIsShutDown={setIsShutDown}
          />
        </div>
      </div>
    </div>
  )
}

interface PowerMenuProps {
  isPowerMenuOpen: boolean
  powerMenuRef: React.RefObject<HTMLDivElement>
  setIsPowerMenuOpen: (value: boolean) => void
  setIsLocked: (value: boolean) => void
  setIsSleeping: (value: boolean) => void
  setIsRestarting: (value: boolean) => void
  setIsShutDown: (value: boolean) => void
}

function PowerMenu({
  isPowerMenuOpen,
  powerMenuRef,
  setIsPowerMenuOpen,
  setIsLocked,
  setIsSleeping,
  setIsRestarting,
  setIsShutDown,
}: PowerMenuProps) {
  useOutsideClick(powerMenuRef, () => setIsPowerMenuOpen(false))

  if (!isPowerMenuOpen) return null

  return (
    <div
      ref={powerMenuRef}
      className="absolute bottom-full right-0 mb-2 w-56 bg-gray-900/90 backdrop-blur-xl rounded-md shadow-lg overflow-hidden text-sm border border-white/20"
    >
      <button
        className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
        onClick={() => {
          setIsPowerMenuOpen(false)
          setIsSleeping(true)
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <Moon className="w-5 h-5" />
        </div>
        <span>Sleep</span>
      </button>
      <button
        className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
        onClick={() => {
          setIsPowerMenuOpen(false)
          setIsRestarting(true)
          setTimeout(() => {
            setIsRestarting(false)
          }, 5000)
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <RotateCcw className="w-5 h-5" />
        </div>
        <span>Restart</span>
      </button>
      <button
        className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
        onClick={() => {
          setIsPowerMenuOpen(false)
          setIsShutDown(true)
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <Power className="w-5 h-5" />
        </div>
        <span>Shut down</span>
      </button>
      <button
        className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
        onClick={() => {
          setIsPowerMenuOpen(false)
          setIsLocked(true)
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <Lock className="w-5 h-5" />
        </div>
        <span>Lock</span>
      </button>
    </div>
  )
}

// Import missing components
import { Moon, RotateCcw } from "lucide-react"
