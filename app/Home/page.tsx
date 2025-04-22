"use client"

import type React from "react"

import { useState, useRef, type FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  X,
  Plus,
  Globe,
  Search,
  AlertCircle,
  FileText,
  BookOpen,
  Cloud,
  Library,
  ImageIcon,
  Palette,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tab {
  id: string
  url: string
  displayUrl: string
  title: string
  history: string[]
  historyIndex: number
}

interface BrowserProps {
  initialUrl?: string
}

export default function Browser({ initialUrl = "https://en.wikipedia.org/wiki/Main_Page" }: BrowserProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "tab-1",
      url: initialUrl,
      displayUrl: initialUrl,
      title: "Wikipedia",
      history: [initialUrl],
      historyIndex: 0,
    },
  ])
  const [activeTabId, setActiveTabId] = useState("tab-1")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0]

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  // Add this function to check if a website is likely to work in an iframe
  // Add this after the isValidUrl function

  const getWorkingSites = () => {
    return [
      { url: "https://en.wikipedia.org/wiki/Main_Page", title: "Wikipedia" },
      { url: "https://www.nasa.gov", title: "NASA" },
      { url: "https://archive.org", title: "Internet Archive" },
      { url: "https://www.gutenberg.org", title: "Project Gutenberg" },
      { url: "https://www.wolframalpha.com", title: "Wolfram Alpha" },
      { url: "https://www.openstreetmap.org", title: "OpenStreetMap" },
      { url: "https://www.weather.gov", title: "Weather.gov" },
      { url: "https://www.loc.gov", title: "Library of Congress" },
      { url: "https://publicdomainreview.org", title: "Public Domain Review" },
      { url: "https://www.metmuseum.org/art/collection", title: "Met Museum" },
    ]
  }

  // Add this function to suggest a random working site
  // Add this after the getWorkingSites function

  const openRandomWorkingSite = () => {
    const sites = getWorkingSites()
    const randomSite = sites[Math.floor(Math.random() * sites.length)]
    openPresetSite(randomSite.url, randomSite.title)
  }

  const formatUrl = (input: string): string => {
    // If it's already a valid URL, return it
    if (isValidUrl(input)) return input

    // If it has domain-like format (something.something), add https://
    if (/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+/.test(input)) {
      return `https://${input}`
    }

    // Otherwise treat as search query
    // Using DuckDuckGo as it's more iframe-friendly than Google
    return `https://duckduckgo.com/?q=${encodeURIComponent(input)}`
  }

  const navigateTo = (newUrl: string) => {
    setError(null)
    setIsLoading(true)

    const formattedUrl = formatUrl(newUrl)

    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          // Update history
          const newHistory = tab.history.slice(0, tab.historyIndex + 1)
          newHistory.push(formattedUrl)

          return {
            ...tab,
            url: formattedUrl,
            displayUrl: newUrl,
            history: newHistory,
            historyIndex: newHistory.length - 1,
          }
        }
        return tab
      }),
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUrl = formData.get("url") as string
    navigateTo(newUrl)
    setShowSearchDropdown(false)
  }

  const goBack = () => {
    if (activeTab.historyIndex > 0) {
      setError(null)
      setIsLoading(true)

      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            const newIndex = tab.historyIndex - 1
            const prevUrl = tab.history[newIndex]
            return {
              ...tab,
              url: prevUrl,
              displayUrl: prevUrl,
              historyIndex: newIndex,
            }
          }
          return tab
        }),
      )
    }
  }

  const goForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      setError(null)
      setIsLoading(true)

      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            const newIndex = tab.historyIndex + 1
            const nextUrl = tab.history[newIndex]
            return {
              ...tab,
              url: nextUrl,
              displayUrl: nextUrl,
              historyIndex: newIndex,
            }
          }
          return tab
        }),
      )
    }
  }

  const refresh = () => {
    setError(null)
    setIsLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = activeTab.url
    }
  }

  const addNewTab = (url = "https://en.wikipedia.org/wiki/Main_Page", title = "New Tab") => {
    const newTabId = `tab-${Date.now()}`
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: newTabId,
        url,
        displayUrl: url,
        title,
        history: [url],
        historyIndex: 0,
      },
    ])
    setActiveTabId(newTabId)
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (tabs.length === 1) {
      // Don't close the last tab, just reset it
      setTabs([
        {
          id: "tab-1",
          url: "https://en.wikipedia.org/wiki/Main_Page",
          displayUrl: "https://en.wikipedia.org/wiki/Main_Page",
          title: "Wikipedia",
          history: ["https://en.wikipedia.org/wiki/Main_Page"],
          historyIndex: 0,
        },
      ])
      setActiveTabId("tab-1")
      return
    }

    const newTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(newTabs)

    // If we're closing the active tab, activate another one
    if (tabId === activeTabId) {
      setActiveTabId(newTabs[0].id)
    }
  }

  // Modify the handleIframeError function to suggest working sites
  const handleIframeError = () => {
    setError(
      "This website cannot be displayed in an iframe due to security restrictions. Try one of our suggested sites instead.",
    )
    setIsLoading(false)
  }

  // Focus the input when clicking the address bar area
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }

  const searchWikipedia = (query: string) => {
    if (!query.trim()) return

    const wikipediaSearchUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`
    navigateTo(wikipediaSearchUrl)
    setSearchQuery("")
    setShowSearchDropdown(false)
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    searchWikipedia(searchQuery)
  }

  const openPresetSite = (url: string, title: string) => {
    addNewTab(url, title)
  }

  // Handle iframe load errors
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "iframe-error") {
        handleIframeError()
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <Card className="w-full max-w-4xl shadow-lg border border-gray-200">
      <CardHeader className="p-0 bg-gray-100 border-b border-gray-200 text-black">
        <div className="flex items-center px-2 py-2 overflow-x-auto">
          {/* Tabs */}
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center rounded-t-lg px-3 py-2 border-t border-l border-r border-gray-200 mr-1 cursor-pointer ${
                  tab.id === activeTabId ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <Globe className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm truncate max-w-[120px]">{tab.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-5 h-5 ml-2 text-gray-500"
                  onClick={(e) => closeTab(tab.id, e)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="w-6 h-6 ml-1 text-gray-500" onClick={() => addNewTab()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation bar */}
        <div className="flex items-center gap-1 px-2 pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={goBack}
            disabled={activeTab.historyIndex <= 0}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={goForward}
            disabled={activeTab.historyIndex >= activeTab.history.length - 1}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={refresh}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <form onSubmit={handleSubmit} className="flex-1 relative">
            <div className="relative" onClick={focusInput}>
              <Input
                ref={inputRef}
                name="url"
                className="h-8 pl-8 pr-4 bg-gray-50 border border-gray-300 text-sm"
                placeholder="Search or enter website name"
                value={activeTab.displayUrl}
                onChange={(e) => {
                  setTabs((prevTabs) =>
                    prevTabs.map((tab) => {
                      if (tab.id === activeTabId) {
                        return {
                          ...tab,
                          displayUrl: e.target.value,
                        }
                      }
                      return tab
                    }),
                  )
                }}
              />
              {isValidUrl(activeTab.displayUrl) ? (
                <Globe className="absolute left-2 top-2 w-4 h-4 text-blue-600" />
              ) : (
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              )}
            </div>
          </form>
        </div>

        {/* Quick access toolbar */}
        <div className="flex items-center px-2 pb-2 overflow-x-auto">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid grid-cols-5 h-8">
              <TabsTrigger
                value="search"
                className="text-xs"
                onClick={() => openPresetSite("https://en.wikipedia.org/wiki/Main_Page", "Wikipedia")}
              >
                Wikipedia
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="text-xs"
                onClick={() => openPresetSite("https://www.gutenberg.org", "Project Gutenberg")}
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="science"
                className="text-xs"
                onClick={() => openPresetSite("https://www.nasa.gov", "NASA")}
              >
                Science
              </TabsTrigger>
              <TabsTrigger
                value="maps"
                className="text-xs"
                onClick={() => openPresetSite("https://www.openstreetmap.org", "OpenStreetMap")}
              >
                Maps
              </TabsTrigger>
              <TabsTrigger
                value="arts"
                className="text-xs"
                onClick={() => openPresetSite("https://www.metmuseum.org/art/collection", "Met Museum")}
              >
                Arts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Wikipedia search bar */}
        <div className="flex items-center px-2 pb-2">
          <form onSubmit={handleSearchSubmit} className="flex w-full gap-2">
            <div className="relative flex-1">
              <Input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 bg-white"
                placeholder="Search Wikipedia..."
                onFocus={() => setShowSearchDropdown(true)}
              />
              <BookOpen className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            </div>
            <Button type="submit" size="sm" className="h-8">
              Search
            </Button>
          </form>
        </div>

        {/* Quick access buttons - Websites that work in iframes */}
        <div className="flex items-center px-2 pb-2 gap-2 overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://en.wikipedia.org/wiki/Main_Page", "Wikipedia")}
          >
            <BookOpen className="w-4 h-4 mr-1" /> Wikipedia
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://buyme-omega.vercel.app/", "Buyme")}
          >
            <Globe className="w-4 h-4 mr-1" /> Buyme
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://text-ai-seven.vercel.app/", "Text-AI")}
          >
            <Globe className="w-4 h-4 mr-1" /> Text-AI
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://i-phone-website-olive.vercel.app/", "Iphone 15")}
          >
            <Globe className="w-4 h-4 mr-1" /> Iphone
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://archive.org", "Internet Archive")}
          >
            <FileText className="w-4 h-4 mr-1" /> Internet Archive
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.gutenberg.org", "Project Gutenberg")}
          >
            <BookOpen className="w-4 h-4 mr-1" /> Gutenberg
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.wolframalpha.com", "Wolfram Alpha")}
          >
            <Search className="w-4 h-4 mr-1" /> Wolfram Alpha
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.openstreetmap.org", "OpenStreetMap")}
          >
            <Globe className="w-4 h-4 mr-1" /> OpenStreetMap
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.weather.gov", "Weather.gov")}
          >
            <Cloud className="w-4 h-4 mr-1" /> Weather.gov
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.loc.gov", "Library of Congress")}
          >
            <Library className="w-4 h-4 mr-1" /> Library of Congress
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://publicdomainreview.org", "Public Domain Review")}
          >
            <ImageIcon className="w-4 h-4 mr-1" /> Public Domain
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs whitespace-nowrap text-white"
            onClick={() => openPresetSite("https://www.metmuseum.org/art/collection", "Met Museum")}
          >
            <Palette className="w-4 h-4 mr-1" /> Met Museum
          </Button>
        </div>

        {/* Search dropdown */}
        {showSearchDropdown && searchQuery.trim() && (
          <div className="absolute z-10 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg mt-1 left-1/2 transform -translate-x-1/2">
            <div className="p-2">
              <div
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => searchWikipedia(searchQuery)}
              >
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-2 text-gray-500" />
                  <span>
                    Search Wikipedia for: <strong>{searchQuery}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0 h-[500px] bg-white relative">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex flex-col gap-4 items-center">
              <p className="text-sm text-center">
                Many websites block being displayed in iframes for security reasons.
              </p>
              <Button onClick={openRandomWorkingSite}>Try a Working Website Instead</Button>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {getWorkingSites()
                  .slice(0, 6)
                  .map((site, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => openPresetSite(site.url, site.title)}
                    >
                      {site.title}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                <div className="h-full bg-blue-500 animate-progress"></div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={activeTab.url}
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
