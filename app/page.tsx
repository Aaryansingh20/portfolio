"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
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
  Maximize2,
} from "lucide-react"
import Portfolio from "@/components/ui/portfolio"
import Notepad from "@/components/ui/Notepad"
import Calculator from "@/components/ui/Calculator"
import Weather from "@/components/ui/weather"
import { useRef } from "react"

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
  isMaximized: boolean
  position: { x: number; y: number }
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
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const [enteredPassword, setEnteredPassword] = useState("")
  const [isShutDown, setIsShutDown] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [isSleeping, setIsSleeping] = useState(false)
  const computerWindowRef = useRef<HTMLDivElement>(null)

  const pinnedApps = useMemo(
    () => [
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
    ],
    [],
  )

  const recommendedItems = useMemo(
    () => [
      { name: "Document.txt", type: "Recently added", icon: "📄" },
      { name: "Project.pdf", type: "Yesterday at 2:30 PM", icon: "📑" },
      { name: "Meeting Notes.docx", type: "Yesterday at 11:24 AM", icon: "📝" },
      { name: "Budget.xlsx", type: "Tuesday at 3:45 PM", icon: "📊" },
      { name: "Presentation.pptx", type: "Monday at 9:15 AM", icon: "🎭" },
      { name: "Report.pdf", type: "Last week", icon: "📊" },
      { name: "Image001.jpg", type: "Last month", icon: "🖼️" },
      { name: "Resume.docx", type: "Last month", icon: "📄" },
    ],
    [],
  )

  const [desktopApps, setDesktopApps] = useState<DesktopApp[]>([
    {
      name: "PDF Reader",
      icon: "📄",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 20, y: 260 },
    },
    {
      name: "Notepad",
      icon: "📝",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 20 },
    },
    {
      name: "Calculator",
      icon: "🧮",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 100 },
    },
    {
      name: "Weather",
      icon: "🌤️",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 180 },
    },
  ])

  const [openApps, setOpenApps] = useState<DesktopApp[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openApp = (app: DesktopApp) => {
    if (!app.isOpen) {
      const computerRect = computerWindowRef.current?.getBoundingClientRect()
      const screenWidth = computerRect?.width || window.innerWidth
      const screenHeight = computerRect?.height || window.innerHeight
      const appWidth = app.name === "Calculator" ? 300 : Math.min(screenWidth * 0.8, 800)
      const appHeight = app.name === "Calculator" ? 400 : Math.min(screenHeight * 0.8, 600)
      const centerX = (screenWidth - appWidth) / 2
      const centerY = (screenHeight - appHeight) / 2
      const newApp = {
        ...app,
        isOpen: true,
        isMinimized: false,
        position: { x: centerX, y: centerY },
      }
      setOpenApps((prevApps) => [...prevApps, newApp])
      setDesktopApps((prevApps) => prevApps.map((a) => (a.name === app.name ? newApp : a)))
      setActiveWindow(app.name)
    } else if (app.isMinimized) {
      setOpenApps((prevApps) => prevApps.map((a) => (a.name === app.name ? { ...a, isMinimized: false } : a)))
      setActiveWindow(app.name)
    } else {
      setActiveWindow(app.name)
    }
  }

  const closeApp = (app: DesktopApp) => {
    setDesktopApps(
      desktopApps.map((a) =>
        a.name === app.name ? { ...a, isOpen: false, isMinimized: false, isMaximized: false } : a,
      ),
    )
    setOpenApps(openApps.filter((a) => a.name !== app.name))
    setActiveWindow(openApps.find((a) => a.name !== app.name)?.name || null)
  }

  const minimizeApp = (app: DesktopApp) => {
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMinimized: true } : a)))
    setActiveWindow(openApps.find((a) => a.name !== app.name && !a.isMinimized)?.name || null)
  }

  const toggleMaximizeApp = (app: DesktopApp) => {
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMaximized: !a.isMaximized } : a)))
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
  }, [searchTerm, pinnedApps, recommendedItems])

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

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>, app: DesktopApp) => {
    if (e.target instanceof HTMLElement && (e.target.closest(".window-controls") || e.target.closest("button"))) {
      return
    }
    setActiveWindow(app.name)
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && activeWindow) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        setOpenApps((prevApps) =>
          prevApps.map((app) => (app.name === activeWindow ? { ...app, position: { x: newX, y: newY } } : app)),
        )
      }
    },
    [isDragging, activeWindow, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked) {
      interval = setInterval(() => {
        setLockTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLocked])

  useEffect(() => {
    if (isSleeping) {
      const handleMouseMove = () => {
        setIsSleeping(false)
      }
      document.addEventListener("mousemove", handleMouseMove)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isSleeping])

  useEffect(() => {
    const handleResize = () => {
      const computerRect = computerWindowRef.current?.getBoundingClientRect()
      setOpenApps((prevApps) =>
        prevApps.map((app) => {
          if (app.isMaximized) return app
          const screenWidth = computerRect?.width || window.innerWidth
          const screenHeight = computerRect?.height || window.innerHeight
          const appWidth = app.name === "Calculator" ? 300 : Math.min(screenWidth * 0.8, 800)
          const appHeight = app.name === "Calculator" ? 400 : Math.min(screenHeight * 0.8, 600)
          const centerX = (screenWidth - appWidth) / 2
          const centerY = (screenHeight - appHeight) / 2
          return { ...app, position: { x: centerX, y: centerY } }
        }),
      )
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const positionApps = () => {
      const computerRect = computerWindowRef.current?.getBoundingClientRect()
      setOpenApps((prevApps) =>
        prevApps.map((app) => {
          if (app.isMaximized) return app
          const screenWidth = computerRect?.width || window.innerWidth
          const screenHeight = computerRect?.height || window.innerHeight
          const appWidth = app.name === "Calculator" ? 300 : Math.min(screenWidth * 0.8, 800)
          const appHeight = app.name === "Calculator" ? 400 : Math.min(screenHeight * 0.8, 600)
          const centerX = (screenWidth - appWidth) / 2
          const centerY = (screenHeight - appHeight) / 2
          return { ...app, position: { x: centerX, y: centerY } }
        }),
      )
    }

    positionApps()
    window.addEventListener("resize", positionApps)
    return () => window.removeEventListener("resize", positionApps)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Screen content */}
      <div
        ref={computerWindowRef}
        className="w-[95vw] max-w-6xl aspect-[16/10] bg-gradient-to-br from-[#0c1c3d] via-[#1e3b8a] to-[#5b2a8a] rounded-lg relative overflow-hidden shadow-2xl"
      >
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
            className={`absolute bg-gray-800/90 backdrop-blur-xl text-white shadow-2xl overflow-hidden flex flex-col
                        transition-all duration-100 ease-out rounded-lg
                        ${app.isMinimized ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
                        ${activeWindow === app.name ? "z-10" : "z-0"}
                        ${
                          app.isMaximized
                            ? "left-0 right-0 top-0 bottom-12 rounded-none"
                            : app.name === "Calculator"
                              ? "w-[300px] h-[400px]"
                              : "w-[80%] h-[80%] max-w-4xl max-h-[600px]"
                        }`}
            style={
              !app.isMaximized
                ? {
                    left: `${app.position.x}px`,
                    top: `${app.position.y}px`,
                  }
                : undefined
            }
            onMouseDown={(e) => handleMouseDown(e, app)}
          >
            <div className="flex justify-between items-center p-2 bg-gray-700/50">
              <div className="flex items-center gap-2 ml-1">
                <span className="text-sm font-semibold">{app.name}</span>
              </div>
              <div className="flex items-center gap-1 window-controls">
                <button onClick={() => minimizeApp(app)} className="p-1 hover:bg-gray-600/80 transition-colors rounded">
                  <Minus className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => toggleMaximizeApp(app)}
                  className="p-1 hover:bg-gray-600/80 transition-colors rounded"
                >
                  <Maximize2 className="w-4 h-4 text-gray-300" />
                </button>
                <button onClick={() => closeApp(app)} className="p-1 hover:bg-red-500 transition-colors rounded">
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full overflow-auto scrollbar-hide">
              {app.name === "PDF Reader" ? (
                <Portfolio />
              ) : app.name === "Notepad" ? (
                <Notepad />
              ) : app.name === "Calculator" ? (
                <Calculator />
              ) : app.name === "Weather" ? (
                <Weather />
              ) : (
                <p className="text-sm">Content for {app.name}</p>
              )}
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
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
                      onClick={() => {
                        setIsPowerMenuOpen(false)
                        setIsSleeping(true)
                      }}
                    >
                      <Moon className="w-4 h-4" /> <span>Sleep</span>
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
                      <RotateCcw className="w-4 h-4" /> <span>Restart</span>
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
                      onClick={() => {
                        setIsPowerMenuOpen(false)
                        setIsShutDown(true)
                      }}
                    >
                      <Power className="w-4 h-4" /> <span>Shut down</span>
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3"
                      onClick={() => {
                        setIsPowerMenuOpen(false)
                        setIsLocked(true)
                      }}
                    >
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
            <div
              className="text-sm mr-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors duration-200"
              onClick={() => setIsTimePopupOpen(!isTimePopupOpen)}
            >
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            {isTimePopupOpen && (
              <div
                ref={timePopupRef}
                className="absolute bottom-full right-0 mb-2 w-96 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-lg overflow-hidden text-sm border border-white/20 p-6"
              >
                <div className="text-2xl font-bold mb-4">
                  {currentTime.toLocaleString([], { weekday: "long", month: "long", day: "numeric" })}
                </div>
                <div className="text-4xl font-bold mb-6 text-blue-400">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-white/60 font-semibold text-xs mb-2">
                      {day}
                    </div>
                  ))}
                  {(() => {
                    const today = new Date(currentTime)
                    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                    const daysInMonth = lastDayOfMonth.getDate()
                    const startingDay = firstDayOfMonth.getDay()

                    return Array.from({ length: 42 }, (_, i) => {
                      const day = i - startingDay + 1
                      const isCurrentMonth = day > 0 && day <= daysInMonth
                      const isToday = isCurrentMonth && day === today.getDate()
                      const isPastDate = isCurrentMonth && day < today.getDate()

                      return (
                        <div
                          key={i}
                          className={`p-1 rounded-lg w-8 h-8 flex items-center justify-center text-sm ${
                            isCurrentMonth
                              ? isToday
                                ? "bg-blue-500 text-white font-bold"
                                : isPastDate
                                  ? "text-white/40 hover:bg-white/5 cursor-pointer"
                                  : "hover:bg-white/10 cursor-pointer"
                              : "text-white/20"
                          }`}
                        >
                          {isCurrentMonth ? day : ""}
                        </div>
                      )
                    })
                  })()}
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
                    if (enteredPassword === "123") {
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
        {isRestarting && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-white text-center">
              <RotateCcw className="w-16 h-16 animate-spin mb-4" />
              <p className="text-2xl">Restarting...</p>
            </div>
          </div>
        )}
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
        {isSleeping && <div className="absolute inset-0 bg-black z-50" />}
      </div>
    </div>
  )
}

