"use client"

import Portfolio from "@/components/ui/portfolio"

export default function MobileMockup() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="relative w-[320px] h-[650px] rounded-[36px] overflow-hidden border-[14px] border-black bg-white shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[14px] z-10"></div>

        {/* Power button */}
        <div className="absolute top-[100px] right-[-14px] w-[4px] h-[60px] bg-gray-700 rounded-r-sm"></div>

        {/* Volume buttons */}
        <div className="absolute top-[180px] left-[-14px] w-[4px] h-[40px] bg-gray-700 rounded-l-sm"></div>
        <div className="absolute top-[230px] left-[-14px] w-[4px] h-[40px] bg-gray-700 rounded-l-sm"></div>

        {/* Screen content - Portfolio */}
        <div className="w-full h-full overflow-auto">
          <Portfolio />
        </div>
      </div>
    </div>
  )
}
