"use client"

import LaptopMockup from "@/components/windows/LaptopMockup"
import TabletMockup from "@/components/ui/TabletMockup"
import MobileMockup from "@/components/ui/MobileMockup"
import { useDeviceType } from "@/hooks/use-device-type"

export default function Home() {
  const deviceType = useDeviceType()

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#f5f7fa_0%,_#c3cfe2_100%)] overflow-auto scrollbar-hide">
      {deviceType === "mobile" && <MobileMockup />}
      {deviceType === "tablet" && <TabletMockup />}
      {deviceType === "laptop" && <LaptopMockup />}
    </main>
  )
}
