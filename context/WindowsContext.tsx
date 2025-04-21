"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"

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

interface WindowsContextType {
  // Desktop apps
  desktopApps: DesktopApp[]
  setDesktopApps: React.Dispatch<React.SetStateAction<DesktopApp[]>>

  // Open apps
  openApps: DesktopApp[]
  setOpenApps: React.Dispatch<React.SetStateAction<DesktopApp[]>>

  // Active window
  activeWindow: string | null
  setActiveWindow: React.Dispatch<React.SetStateAction<string | null>>

  // UI state
  isStartOpen: boolean
  setIsStartOpen: React.Dispatch<React.SetStateAction<boolean>>
  isPowerMenuOpen: boolean
  setIsPowerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  isExtraIconsOpen: boolean
  setIsExtraIconsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTimePopupOpen: boolean
  setIsTimePopupOpen: React.Dispatch<React.SetStateAction<boolean>>
  isQuickSettingsOpen: boolean
  setIsQuickSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>

  // System state
  isLocked: boolean
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>
  isShutDown: boolean
  setIsShutDown: React.Dispatch<React.SetStateAction<boolean>>
  isRestarting: boolean
  setIsRestarting: React.Dispatch<React.SetStateAction<boolean>>
  isSleeping: boolean
  setIsSleeping: React.Dispatch<React.SetStateAction<boolean>>

  // Search
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>

  // Quick settings
  brightness: number
  setBrightness: React.Dispatch<React.SetStateAction<number>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  batteryPercentage: number
  setBatteryPercentage: React.Dispatch<React.SetStateAction<number>>
  activeQuickSetting: string
  setActiveQuickSetting: React.Dispatch<React.SetStateAction<string>>
  enabledSettings: string[]
  setEnabledSettings: React.Dispatch<React.SetStateAction<string[]>>
  quickSettingsAnchor: { x: number; y: number } | null
  setQuickSettingsAnchor: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>

  // Lock screen
  lockTimer: number
  setLockTimer: React.Dispatch<React.SetStateAction<number>>
  enteredPassword: string
  setEnteredPassword: React.Dispatch<React.SetStateAction<string>>

  // Time
  currentTime: Date

  // Data
  pinnedApps: PinnedApp[]
  recommendedItems: RecommendedItem[]

  // Window actions
  openApp: (app: DesktopApp) => void
  closeApp: (app: DesktopApp) => void
  minimizeApp: (app: DesktopApp) => void
  toggleMaximizeApp: (app: DesktopApp) => void
  closeQuickSettings: () => void
  handleQuickSettingClick: (setting: string, event: React.MouseEvent) => void
}

const WindowsContext = createContext<WindowsContextType | undefined>(undefined)

export const WindowsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Desktop apps
  const [desktopApps, setDesktopApps] = useState<DesktopApp[]>([
    {
      name: "Portfolio",
      icon: "📄",
      isOpen: false,
      isMinimized: false,
      isMaximized: true,
      position: { x: 20, y: 260 },
    },
    {
      name: "Notepad",
      icon: "📝",
      isOpen: false,
      isMinimized: false,
      isMaximized: true,
      position: { x: 120, y: 20 },
    },{
      name: "Memorytest",
      icon: "🧠",
      isOpen: false,
      isMinimized: false,
      isMaximized: true,
      position: { x: 120, y: 20 },
    },
    {
      name: "Calculator",
      icon: "🧮",
      isOpen: false,
      isMinimized: false,
      isMaximized: true,
      position: { x: 120, y: 100 },
    },
    {
      name: "Paint",
      icon: "🎨",
      isOpen: false,
      isMinimized: false,
      isMaximized: true,
      position: { x: 120, y: 180 },
    },
  ])

  // Open apps
  const [openApps, setOpenApps] = useState<DesktopApp[]>([])

  // Active window
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  // UI state
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false)
  const [isExtraIconsOpen, setIsExtraIconsOpen] = useState(false)
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false)
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false)

  // System state
  const [isLocked, setIsLocked] = useState(false)
  const [isShutDown, setIsShutDown] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [isSleeping, setIsSleeping] = useState(false)

  // Search
  const [searchTerm, setSearchTerm] = useState("")

  // Quick settings
  const [brightness, setBrightness] = useState(50)
  const [volume, setVolume] = useState(75)
  const [batteryPercentage, setBatteryPercentage] = useState(75)
  const [activeQuickSetting, setActiveQuickSetting] = useState<string>("wifi")
  const [enabledSettings, setEnabledSettings] = useState<string[]>(["wifi"])
  const [quickSettingsAnchor, setQuickSettingsAnchor] = useState<{ x: number; y: number } | null>(null)

  // Lock screen
  const [lockTimer, setLockTimer] = useState(0)
  const [enteredPassword, setEnteredPassword] = useState("")

  // Time
  const [currentTime, setCurrentTime] = useState(new Date())

  // Data
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

  // Window actions
  const openApp = (app: DesktopApp) => {
    if (!app.isOpen) {
      // Get the computer window dimensions
      const computerWindow = document.querySelector(".computer-window") as HTMLElement
      const computerRect = computerWindow?.getBoundingClientRect()
      const screenWidth = computerRect?.width || window.innerWidth
      const screenHeight = computerRect?.height || window.innerHeight

      // Calculate app dimensions and position
      const appWidth = app.name === "Calculator" ? 300 : Math.min(screenWidth * 0.8, 800)
      const appHeight = app.name === "Calculator" ? 400 : Math.min(screenHeight * 0.8, 600)
      const centerX = (screenWidth - appWidth) / 2
      const centerY = (screenHeight - appHeight) / 2

      // Create new app with updated properties
      const newApp = {
        ...app,
        isOpen: true,
        isMinimized: false,
        position: { x: centerX, y: centerY },
      }

      // Update state
      setOpenApps((prevApps) => [...prevApps, newApp])
      setDesktopApps((prevApps) => prevApps.map((a) => (a.name === app.name ? newApp : a)))
      setActiveWindow(app.name)
    } else if (app.isMinimized) {
      // Restore minimized app
      setOpenApps((prevApps) => prevApps.map((a) => (a.name === app.name ? { ...a, isMinimized: false } : a)))
      setActiveWindow(app.name)
    } else {
      // Set as active window
      setActiveWindow(app.name)
    }
  }

  const closeApp = (app: DesktopApp) => {
    // Reset app state
    setDesktopApps(
      desktopApps.map((a) =>
        a.name === app.name ? { ...a, isOpen: false, isMinimized: false, isMaximized: false } : a,
      ),
    )

    // Remove from open apps
    setOpenApps(openApps.filter((a) => a.name !== app.name))

    // Set next active window
    setActiveWindow(openApps.find((a) => a.name !== app.name)?.name || null)
  }

  const minimizeApp = (app: DesktopApp) => {
    // Minimize app
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMinimized: true } : a)))

    // Set next active window
    setActiveWindow(openApps.find((a) => a.name !== app.name && !a.isMinimized)?.name || null)
  }

  const toggleMaximizeApp = (app: DesktopApp) => {
    // Toggle maximize state
    setOpenApps(openApps.map((a) => (a.name === app.name ? { ...a, isMaximized: !a.isMaximized } : a)))
  }

  const closeQuickSettings = () => {
    setIsQuickSettingsOpen(false)
    setQuickSettingsAnchor(null)
  }

  const handleQuickSettingClick = (setting: string, event: React.MouseEvent) => {
    setActiveQuickSetting(setting)
    setIsQuickSettingsOpen(true)
    setEnabledSettings((prev) => (prev.includes(setting) ? prev.filter((s) => s !== setting) : [...prev, setting]))

    // Get the bounding rectangle of the taskbar
    const taskbarRect = (event.currentTarget.closest(".absolute.bottom-0") as HTMLElement)?.getBoundingClientRect()

    if (taskbarRect) {
      // Position the panel relative to the taskbar
      setQuickSettingsAnchor({
        x: taskbarRect.right - 300, // 300px is the approximate width of the quick settings panel
        y: taskbarRect.top,
      })
    }
  }

  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
    const interval = setInterval(() => {
      setBatteryPercentage((prev) => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 11) - 5)))
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const value = {
    // Desktop apps
    desktopApps,
    setDesktopApps,

    // Open apps
    openApps,
    setOpenApps,

    // Active window
    activeWindow,
    setActiveWindow,

    // UI state
    isStartOpen,
    setIsStartOpen,
    isPowerMenuOpen,
    setIsPowerMenuOpen,
    isExtraIconsOpen,
    setIsExtraIconsOpen,
    isTimePopupOpen,
    setIsTimePopupOpen,
    isQuickSettingsOpen,
    setIsQuickSettingsOpen,

    // System state
    isLocked,
    setIsLocked,
    isShutDown,
    setIsShutDown,
    isRestarting,
    setIsRestarting,
    isSleeping,
    setIsSleeping,

    // Search
    searchTerm,
    setSearchTerm,

    // Quick settings
    brightness,
    setBrightness,
    volume,
    setVolume,
    batteryPercentage,
    setBatteryPercentage,
    activeQuickSetting,
    setActiveQuickSetting,
    enabledSettings,
    setEnabledSettings,
    quickSettingsAnchor,
    setQuickSettingsAnchor,

    // Lock screen
    lockTimer,
    setLockTimer,
    enteredPassword,
    setEnteredPassword,

    // Time
    currentTime,

    // Data
    pinnedApps,
    recommendedItems,

    // Window actions
    openApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    closeQuickSettings,
    handleQuickSettingClick,
  }

  return <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
}

export const useWindows = () => {
  const context = useContext(WindowsContext)
  if (context === undefined) {
    throw new Error("useWindows must be used within a WindowsProvider")
  }
  return context
}
