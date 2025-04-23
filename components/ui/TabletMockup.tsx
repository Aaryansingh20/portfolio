"use client"

import Portfolio from "@/components/ui/portfolio"

export default function TabletMockup() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="relative w-[768px] h-[550px] rounded-[24px] overflow-hidden border-[12px] border-gray-800 bg-white shadow-xl">
        {/* Camera */}
        <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-[8px] h-[8px] bg-gray-500 rounded-full z-10"></div>

        {/* Home button */}
        <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-[40px] h-[40px] border-2 border-gray-300 rounded-full"></div>

        {/* Screen content - Portfolio */}
        <div className="w-full h-full overflow-auto">
          <Portfolio />
        </div>
      </div>
    </div>
  )
}
