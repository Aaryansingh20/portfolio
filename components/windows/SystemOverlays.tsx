"use client"
import { useWindows } from "@/context/WindowsContext"
import { Power, RotateCcw } from "lucide-react"

export default function SystemOverlays() {
  const {
    isLocked,
    setIsLocked,
    isShutDown,
    setIsShutDown,
    isRestarting,
    isSleeping,
    currentTime,
    enteredPassword,
    setEnteredPassword,
  } = useWindows()

  return (
    <>
      {/* Lock Screen */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <input
              type="password"
              className="bg-white/10 text-white placeholder-white/60 rounded-full py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (enteredPassword === "aryan") {
                    setIsLocked(false)
                    setEnteredPassword("")
                  } else {
                    alert("Incorrect password")
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Restart Screen */}
      {isRestarting && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-white text-center">
            <RotateCcw className="w-16 h-16 animate-spin mb-4" />
            <p className="text-2xl">Restarting...</p>
          </div>
        </div>
      )}

      {/* Shutdown Screen */}
      {isShutDown && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <button
            className="bg-white/10 text-white rounded-full p-4 hover:bg-white/20 transition-colors"
            onClick={() => setIsShutDown(false)}
          >
            <Power className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Sleep Screen */}
      {isSleeping && <div className="absolute inset-0 bg-black z-50" />}
    </>
  )
}
