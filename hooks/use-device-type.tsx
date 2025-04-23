"use client"

import { useState, useEffect } from "react"

type DeviceType = "mobile" | "tablet" | "laptop"

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("laptop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("laptop")
      }
    }

    // Set initial device type
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceType
}
