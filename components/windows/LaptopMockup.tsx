"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Menu, Search, User } from "lucide-react"
import { useEffect, useState } from "react"
import ModernWindows from "./ModernWindows"

export default function LaptopMockup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setIsOpen(true)
      setShowContent(true)
      return
    }

    // Start opening animation after a short delay
    const openTimer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    // Show content with a delay after opening starts
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1500)

    return () => {
      clearTimeout(openTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="mockup-container w-full max-w-5xl mx-auto">
        <div className="laptop-mockup">
          <div className={`laptop-wrapper ${isOpen ? "laptop-open" : "laptop-closed"}`}>
            <div className="laptop-screen">
              <div className={`laptop-content ${showContent ? "content-visible" : "content-hidden"}`}>
                {/* Website displayed on laptop screen */}
                <div className="website-mockup w-full">
                  <ModernWindows/>
                </div>
              </div>
            </div>
            <div className="laptop-base">
              <div className="laptop-keyboard">
                <div className="laptop-keys">
                  {Array.from({ length: 75 }).map((_, i) => (
                    <div key={i} className="laptop-key"></div>
                  ))}
                </div>
              </div>
              <div className="laptop-trackpad"></div>
            </div>
            <div className="laptop-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
