"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AudioButton() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audioElement = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568.wav")
    audioElement.preload = "auto"

    audioElement.addEventListener("canplaythrough", () => {
      setAudio(audioElement)
      setError(null)
    })

    audioElement.addEventListener("error", () => {
      setError("Failed to load audio")
    })

    return () => {
      audioElement.removeEventListener("canplaythrough", () => {})
      audioElement.removeEventListener("error", () => {})
    }
  }, [])

  const handleClick = () => {
    if (audio) {
      audio.currentTime = 0 // Reset to start
      audio.play().catch((err) => {
        console.error("Playback failed", err)
        setError("Failed to play audio")
      })
    } else {
      setError("Audio not loaded yet")
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Click Me
      </Button>
      {error && (
        <p className="text-red-500 mt-2 flex items-center">
          <AlertCircle className="mr-1 h-4 w-4" /> {error}
        </p>
      )}
    </div>
  )
}

