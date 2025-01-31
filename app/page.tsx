"use client"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Volume2,
  Wifi,
  Battery,
  ChevronUp,
  Power,
  Moon,
  RotateCcw,
  Lock,
  Globe,
  MessageCircle,
  Chrome,
  Languages,
  Cloud,
  X,
  Minus,
  Pin,
} from "lucide-react"
import PDFContent from "@/components/ui/pdf-content"

interface PinnedApp {
  name: string
  icon: string
}

interface RecommendedItem {
  name: string
  type: string
  icon: string
}

interface DesktopApp extends PinnedApp {
  isOpen: boolean
  isMinimized: boolean
  isPinned: boolean
}

export default function ModernWindows() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState<PinnedApp[]>([])
  const [filteredItems, setFilteredItems] = useState<RecommendedItem[]>([])
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false)
  const [isExtraIconsOpen, setIsExtraIconsOpen] = useState(false)
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const startMenuRef = useRef<HTMLDivElement>(null)
  const powerMenuRef = useRef<HTMLDivElement>(null)
  const extraIconsMenuRef = useRef<HTMLDivElement>(null)
  const timePopupRef = useRef<HTMLDivElement>(null)

  const pinnedApps: PinnedApp[] = [
    { name: "Edge", icon: "🌐" },
    { name: "Word", icon: "W" },
    { name: "Excel", icon: "X" },
    { name: "PowerPoint", icon: "P" },
    { name: "Outlook", icon: "✉️" },
    { name: "Calendar", icon: "📅" },
    { name: "Store", icon: "🏪" },
    { name: "Photos", icon: "🖼️" },
    { name: "Settings", icon: "⚙️" },
    { name: "Calculator", icon: "🧮" },
    { name: "Notepad", icon: "📝" },
    { name: "Paint", icon: "🎨" },
    { name: "Teams", icon: "👥" },
    { name: "OneDrive", icon: "☁️" },
    { name: "Spotify", icon: "🎵" },
    { name: "VS Code", icon: "💻" },
    { name: "Terminal", icon: "🖥️" },
    { name: "Skype", icon: "💬" },
    { name: "Weather", icon: "🌤️" },
    { name: "Maps", icon: "🗺️" },
  ]

  const recommendedItems: RecommendedItem[] = [
    { name: "Document.txt", type: "Recently added", icon: "📄" },
    { name: "Project.pdf", type: "Yesterday at 2:30 PM", icon: "📑" },
    { name: "Meeting Notes.docx", type: "Yesterday at 11:24 AM", icon: "📝" },
    { name: "Budget.xlsx", type: "Tuesday at 3:45 PM", icon: "📊" },
    { name: "Presentation.pptx", type: "Monday at 9:15 AM", icon: "🎭" },
    { name: "Report.pdf", type: "Last week", icon: "📊" },
    { name: "Image001.jpg", type: "Last month", icon: "🖼️" },
    { name: "Resume.docx", type: "Last month", icon: "📄" },
  ]

  const [desktopApps, setDesktopApps] = useState<DesktopApp[]>([
    { name: "My Computer", icon: "💻", isOpen: false, isMinimized: false, isPinned: false },
    { name: "Recycle Bin", icon: "🗑️", isOpen: false, isMinimized: false, isPinned: false },
    { name: "Documents", icon: "📁", isOpen: false, isMinimized: false, isPinned: false },
    { name: "PDF Reader", icon: "📄", isOpen: false, isMinimized: false, isPinned: false },
  ])

  const [openApps, setOpenApps] = useState<DesktopApp[]>([])

  const openApp = (app: DesktopApp) => {
    if (!app.isOpen) {
      setDesktopApps(desktopApps.map((a) => (a.name === app.name ? { ...a, isOpen: true, isMinimized: false } : a)))
      setOpenApps([...openApps, { ...app, isOpen: true, isMinimized: false }])
    } else if (app.isMinimized) {
      setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMinimized: false } : a)))
    } else {
      setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMinimized: true } : a)))
    }
  }

  const closeApp = (app: DesktopApp) => {
    setDesktopApps(desktopApps.map((a) => (a.name === app.name ? { ...a, isOpen: false, isMinimized: false } : a)))
    setOpenApps(openApps.filter((a) => a.name !== app.name))
  }

  const minimizeApp = (app: DesktopApp) => {
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMinimized: true } : a)))
  }

  const togglePinApp = (app: DesktopApp) => {
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isPinned: !a.isPinned } : a)))
  }

  const DesktopIcon = ({ app }: { app: DesktopApp }) => (
    <button className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/10" onClick={() => openApp(app)}>
      <span className="text-3xl">{app.icon}</span>
      <span className="text-xs text-center text-white">{app.name}</span>
    </button>
  )

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filteredApps = pinnedApps.filter((app) => app.name.toLowerCase().includes(lowercasedFilter))
    const filteredItems = recommendedItems.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedFilter) || item.type.toLowerCase().includes(lowercasedFilter),
    )
    setFilteredApps(filteredApps)
    setFilteredItems(filteredItems)
  }, [searchTerm])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false)
      }
      if (powerMenuRef.current && !powerMenuRef.current.contains(event.target as Node)) {
        setIsPowerMenuOpen(false)
      }
      if (extraIconsMenuRef.current && !extraIconsMenuRef.current.contains(event.target as Node)) {
        setIsExtraIconsOpen(false)
      }
      if (timePopupRef.current && !timePopupRef.current.contains(event.target as Node)) {
        setIsTimePopupOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Screen content */}
      <div className="w-[95vw] max-w-6xl aspect-[16/10] bg-gradient-to-br from-[#0c1c3d] via-[#1e3b8a] to-[#5b2a8a] rounded-lg relative overflow-hidden shadow-2xl">
        {/* Centered arc light effect */}
        <div className="absolute left-0 right-0 bottom-0 h-[80%] bg-gradient-to-t from-blue-500/20 to-transparent rounded-[100%] blur-3xl"></div>

        {/* Desktop Icons */}
        <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
          {desktopApps.map((app) => (
            <DesktopIcon key={app.name} app={app} />
          ))}
        </div>

        {/* Open Windows */}
        {openApps.map((app) => (
          <div
            key={app.name}
            className={`absolute inset-0 bottom-12 bg-gray-800/90 backdrop-blur-xl text-white shadow-2xl overflow-hidden flex flex-col
                        transition-all duration-300 ease-in-out
                        ${app.isMinimized ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
          >
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">{app.icon}</span>
                <span className="text-sm font-semibold">{app.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => minimizeApp(app)} className="text-white/60 hover:text-white">
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => togglePinApp(app)}
                  className={`text-white/60 hover:text-white ${app.isPinned ? "text-blue-400" : ""}`}
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button onClick={() => closeApp(app)} className="text-white/60 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              {app.name === "PDF Reader" ? <PDFContent /> : <p className="text-sm">Content for {app.name}</p>}
            </div>
          </div>
        ))}

        {/* Start Menu */}
        {isStartOpen && (
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
                  className="bg-transparent border-none outline-none w-full text-sm"
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
                {isPowerMenuOpen && (
                  <div
                    ref={powerMenuRef}
                    className="absolute bottom-full right-0 mb-2 w-56 bg-gray-900/90 backdrop-blur-xl rounded-md shadow-lg overflow-hidden text-sm border border-white/20"
                  >
                    <button className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3">
                      <Moon className="w-4 h-4" /> <span>Sleep</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3">
                      <RotateCcw className="w-4 h-4" /> <span>Restart</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3">
                      <Power className="w-4 h-4" /> <span>Shut down</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3">
                      <Lock className="w-4 h-4" /> <span>Lock</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/90 backdrop-blur-xl flex items-center px-4">
          {/* Left section */}
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10">
              <Cloud className="w-4 h-4 text-blue-300" />
              <span>73°F</span>
              <span className="text-white/60">Cloudy</span>
            </div>
          </div>

          {/* Center section */}
          <div className="flex-1 flex justify-center items-center gap-2">
            <button
              className="p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setIsStartOpen(!isStartOpen)}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                <path
                  fill="currentColor"
                  d="M3 3h8v8H3V3m2 2v4h4V5H5m8-2h8v8h-8V3m2 2v4h4V5h-4M3 13h8v8H3v-8m2 2v4h4v-4H5m8-2h8v8h-8v-8m2 2v4h4v-4h-4"
                />
              </svg>
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Type here to search"
                className="bg-white/10 text-white placeholder-white/60 rounded-full py-1 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            {/* Open app icons */}
            {openApps.map((app) => (
              <button
                key={app.name}
                className={`flex items-center justify-center w-10 h-10 rounded ${
                  app.isMinimized ? "bg-white/5" : "bg-white/10"
                } transition-colors`}
                onClick={() => openApp(app)}
                title={app.name}
              >
                <span className="text-xl">{app.icon}</span>
              </button>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 text-white/80">
            <Volume2 className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
            <div className="text-sm mr-2 cursor-pointer" onClick={() => setIsTimePopupOpen(!isTimePopupOpen)}>
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            {isTimePopupOpen && (
              <div
                ref={timePopupRef}
                className="absolute bottom-full right-0 mb-2 w-96 bg-gray-900/90 backdrop-blur-xl rounded-md shadow-lg overflow-hidden text-sm border border-white/20 p-4"
              >
                <div className="text-lg font-semibold mb-2">
                  {currentTime.toLocaleString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </div>
                <div className="text-3xl font-bold mb-4">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-white/60 font-semibold text-xs mb-1">
                      {day}
                    </div>
                  ))}
                  {Array.from(
                    { length: new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0).getDate() },
                    (_, i) => i + 1,
                  ).map((date) => {
                    const isToday = date === currentTime.getDate()
                    const isPastDate = date < currentTime.getDate()
                    return (
                      <div
                        key={date}
                        className={`p-1 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer ${
                          isToday
                            ? "bg-blue-500 text-white font-bold"
                            : isPastDate
                              ? "text-white/40 hover:bg-white/5"
                              : "hover:bg-white/10"
                        }`}
                      >
                        {date}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            <div className="relative">
              <ChevronUp className="w-4 h-4 cursor-pointer" onClick={() => setIsExtraIconsOpen(!isExtraIconsOpen)} />
              {isExtraIconsOpen && (
                <div
                  ref={extraIconsMenuRef}
                  className="absolute bottom-full right-0 mb-2 py-2 px-3 bg-gray-900/90 backdrop-blur-xl rounded-md shadow-lg overflow-hidden text-sm border border-white/20"
                >
                  <div className="flex flex-col gap-2">
                    <button className="p-2 rounded hover:bg-white/10 w-full flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 w-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 w-full flex items-center justify-center">
                      <Chrome className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 w-full flex items-center justify-center">
                      <Languages className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

