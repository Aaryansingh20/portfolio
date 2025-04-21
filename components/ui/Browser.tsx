"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Home, RefreshCw, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BrowserApp() {
  const [url, setUrl] = useState<string>("https://www.google.com")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [history, setHistory] = useState<string[]>(["https://www.google.com"])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [tabs, setTabs] = useState<string[]>(["Google"])
  const [activeTab, setActiveTab] = useState<string>("tab-0")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate loading
    setIsLoading(true)

    // Add http:// if not present
    let processedUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      processedUrl = `https://${url}`
      setUrl(processedUrl)
    }

    // Update history
    const newHistory = history.slice(0, currentIndex + 1)
    newHistory.push(processedUrl)
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)

    // Simulate page load
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
      setUrl(searchUrl)

      // Update history
      const newHistory = history.slice(0, currentIndex + 1)
      newHistory.push(searchUrl)
      setHistory(newHistory)
      setCurrentIndex(newHistory.length - 1)

      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setUrl(history[currentIndex - 1])

      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUrl(history[currentIndex + 1])

      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const refresh = () => {
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const goHome = () => {
    const homeUrl = "https://www.google.com"
    setUrl(homeUrl)

    // Update history
    const newHistory = history.slice(0, currentIndex + 1)
    newHistory.push(homeUrl)
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)

    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const addNewTab = () => {
    const newTabIndex = tabs.length
    setTabs([...tabs, `New Tab ${newTabIndex}`])
    setActiveTab(`tab-${newTabIndex}`)
    setUrl("https://www.google.com")
    setHistory(["https://www.google.com"])
    setCurrentIndex(0)
  }

  const getDisplayContent = () => {
    const domain = url.replace(/^https?:\/\//, "").split("/")[0]

    if (domain.includes("google.com")) {
      if (url.includes("search?q=")) {
        const query = url.split("search?q=")[1]
        return <GoogleSearchResults query={decodeURIComponent(query)} />
      }
      return <GoogleHomePage />
    }

    return <GenericWebpage url={url} />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Browser chrome */}
      <div className="bg-white border-b shadow-sm text-black">
        {/* Tabs */}
        <div className="flex items-center px-2 pt-2">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="flex h-9 bg-gray-100 p-0">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={`tab-${index}`}
                  onClick={() => setActiveTab(`tab-${index}`)}
                  className="relative h-9 rounded-t-lg rounded-b-none border-b-0 bg-gray-50 px-4 data-[state=active]:bg-white"
                >
                  {tab}
                </TabsTrigger>
              ))}
              <Button variant="ghost" size="icon" onClick={addNewTab} className="h-9 w-9">
                +
              </Button>
            </TabsList>
          </Tabs>
        </div>

        {/* Navigation bar */}
        <div className="flex items-center gap-2 p-2">
          <Button variant="ghost" size="icon" onClick={goBack} disabled={currentIndex === 0} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goForward}
            disabled={currentIndex === history.length - 1}
            className="h-8 w-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={refresh}
            className={`h-8 w-8 ${isLoading ? "animate-spin" : ""}`}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goHome} className="h-8 w-8">
            <Home className="h-4 w-4" />
          </Button>

          {/* URL bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1">
            <div className="flex items-center rounded-md border bg-gray-50 px-3">
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter URL"
              />
            </div>
          </form>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative w-64">
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8"
            />
            <Button variant="ghost" size="icon" type="submit" className="absolute right-0 top-0 h-10 w-10">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
          </div>
        ) : (
          <div className="h-full">{getDisplayContent()}</div>
        )}
      </div>
    </div>
  )
}

// Replace the GoogleHomePage function with this updated version
function GoogleHomePage() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null)

  // Widget definitions
  const widgets = [
    { id: "mail", name: "Mail", icon: "mail", color: "bg-red-100 text-red-600" },
    { id: "maps", name: "Maps", icon: "map", color: "bg-green-100 text-green-600" },
    { id: "drive", name: "Drive", icon: "hard-drive", color: "bg-yellow-100 text-yellow-600" },
    { id: "photos", name: "Photos", icon: "image", color: "bg-blue-100 text-blue-600" },
    { id: "news", name: "News", icon: "newspaper", color: "bg-purple-100 text-purple-600" },
    { id: "calendar", name: "Calendar", icon: "calendar", color: "bg-orange-100 text-orange-600" },
    { id: "translate", name: "Translate", icon: "languages", color: "bg-teal-100 text-teal-600" },
    { id: "youtube", name: "YouTube", icon: "play", color: "bg-red-100 text-red-600" },
  ]

  // Function to render the appropriate widget content
  const renderWidgetContent = () => {
    if (!activeWidget) return null

    const widget = widgets.find((w) => w.id === activeWidget)
    if (!widget) return null

    return (
      <div className="mt-8 w-full max-w-4xl rounded-lg border bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <button onClick={() => setActiveWidget(null)} className="mr-4 rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-medium">{widget.name}</h2>
        </div>

        <div className="min-h-[300px]">
          {activeWidget === "mail" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-medium">Inbox</div>
                <div className="text-sm text-gray-500">12 new messages</div>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Subject Line {i}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      This is a preview of email message {i}. Click to read more...
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{i}h ago</div>
                </div>
              ))}
            </div>
          )}

          {activeWidget === "maps" && (
            <div className="space-y-4">
              <div className="h-[300px] rounded-lg bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Map className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2 text-gray-500">Map would display here</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search locations..." className="flex-1" />
                <Button variant="outline">Directions</Button>
              </div>
            </div>
          )}

          {activeWidget === "drive" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button>+ New</Button>
                <Input placeholder="Search in Drive" className="flex-1" />
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50">
                    <div className="mb-2 h-24 rounded bg-gray-100 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="text-sm font-medium">Document {i}</div>
                    <div className="text-xs text-gray-500">Modified {i} days ago</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeWidget === "photos" && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="font-medium">Recent Photos</div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="aspect-square cursor-pointer overflow-hidden rounded-lg">
                    <img
                      src={`/placeholder.svg?height=150&width=150&text=Photo${i}`}
                      alt={`Photo ${i}`}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeWidget === "news" && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="font-medium">Top Stories</div>
                <div className="text-sm text-gray-500">Updated 2h ago</div>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-gray-50">
                  <img
                    src={`/placeholder.svg?height=80&width=120&text=News${i}`}
                    alt={`News ${i}`}
                    className="h-20 w-28 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">News Headline {i}</div>
                    <div className="text-sm text-gray-500">
                      This is a summary of the news article {i}. Click to read more about this story...
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Source {i} • {i}h ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeWidget === "calendar" && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="font-medium">April 2025</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm
                      ${day === 20 ? "bg-blue-600 text-white" : "hover:bg-gray-100 cursor-pointer"}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="border-t pt-3">
                <div className="font-medium">Upcoming Events</div>
                <div className="mt-2 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-2">
                  <div className="font-medium">Team Meeting</div>
                  <div className="text-sm text-gray-500">Today, 3:00 PM - 4:00 PM</div>
                </div>
              </div>
            </div>
          )}

          {activeWidget === "translate" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between">
                    <div className="text-sm font-medium">English</div>
                    <Button variant="ghost" size="sm">
                      Detect
                    </Button>
                  </div>
                  <textarea
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    rows={4}
                    placeholder="Enter text to translate"
                  ></textarea>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex justify-between">
                    <div className="text-sm font-medium">Spanish</div>
                    <Button variant="ghost" size="sm">
                      Change
                    </Button>
                  </div>
                  <div className="h-[112px] rounded-lg border bg-gray-50 p-3 text-gray-500">
                    Translation will appear here
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeWidget === "youtube" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search YouTube" className="flex-1" />
                <Button>Search</Button>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-gray-50">
                    <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={`/placeholder.svg?height=96&width=160&text=Video${i}`}
                        alt={`Video ${i}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 rounded bg-black bg-opacity-70 px-1 text-xs text-white">
                        {i + 2}:34
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Video Title {i}</div>
                      <div className="text-sm text-gray-500">Channel Name {i}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        {i}M views • {i} months ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!["mail", "maps", "drive", "photos", "news", "calendar", "translate", "youtube"].includes(activeWidget) && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-lg font-medium">{widget.name}</div>
                <div className="text-gray-500">Widget content would display here</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Import the necessary icons
  const {
    Mail,
    Map,
    HardDrive,
    Image,
    Newspaper,
    Calendar,
    Languages,
    Play,
    FileText,
    ArrowLeft,
    ArrowRight,
  } = require("lucide-react")

  // Function to get the icon component by name
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-6 w-6" />
      case "map":
        return <Map className="h-6 w-6" />
      case "hard-drive":
        return <HardDrive className="h-6 w-6" />
      case "image":
        return <Image className="h-6 w-6" />
      case "newspaper":
        return <Newspaper className="h-6 w-6" />
      case "calendar":
        return <Calendar className="h-6 w-6" />
      case "languages":
        return <Languages className="h-6 w-6" />
      case "play":
        return <Play className="h-6 w-6" />
      default:
        return <Mail className="h-6 w-6" />
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-4">
      {!activeWidget ? (
        <>
          <div className="mb-6">
            <img src="/placeholder.svg?height=60&width=180" alt="Google Logo" className="h-15 w-45" />
          </div>
          <div className="mb-8 w-full max-w-lg">
            <div className="flex items-center rounded-full border px-4 py-2 shadow-sm hover:shadow">
              <Search className="mr-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="flex-1 border-0 focus:outline-none bg-white text-black"
                placeholder="Search Google or type a URL"
              />
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <button className="rounded bg-gray-100 px-4 py-2 text-sm text-black hover:bg-gray-200">Google Search</button>
            <button className="rounded bg-gray-100 px-4 py-2 text-sm text-black hover:bg-gray-200">I&apos;m Feeling Lucky</button>
          </div>

          {/* Widgets */}
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8 text-black">
            {widgets.map((widget) => (
              <button
                key={widget.id}
                onClick={() => setActiveWidget(widget.id)}
                className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-gray-100"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${widget.color}`}>
                  {getIconByName(widget.icon)}
                </div>
                <span className="text-xs font-medium">{widget.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        renderWidgetContent()
      )}
    </div>
  )
}

// Replace the GoogleSearchResults component with this enhanced version
function GoogleSearchResults({ query }: { query: string }) {
  // Mock search results based on the query
  const searchResults = generateSearchResults(query)

  return (
    <div className="bg-white p-4">
      <div className="mb-4 border-b pb-4">
        <div className="mb-2 text-xl text-gray-800">Search results for: {query}</div>
        <div className="text-sm text-gray-500">
          About {searchResults.totalResults.toLocaleString()} results ({searchResults.searchTime} seconds)
        </div>
      </div>

      {/* Search filters */}
      <div className="mb-4 flex gap-4 text-sm">
        <button className="flex items-center gap-1 font-medium text-blue-600">
          <Search className="h-4 w-4" /> All
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <img src="/placeholder.svg?height=16&width=16" alt="" className="h-4 w-4" /> Images
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <img src="/placeholder.svg?height=16&width=16" alt="" className="h-4 w-4" /> Videos
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <img src="/placeholder.svg?height=16&width=16" alt="" className="h-4 w-4" /> News
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <img src="/placeholder.svg?height=16&width=16" alt="" className="h-4 w-4" /> Maps
        </button>
      </div>

      {/* Search results */}
      <div className="space-y-8">
        {searchResults.results.map((result, i) => (
          <div key={i} className="max-w-2xl">
            <div className="mb-1 flex items-center text-sm text-gray-600">
              {result.favicon && <img src={result.favicon || "/placeholder.svg"} alt="" className="mr-2 h-4 w-4" />}
              <span>{result.url}</span>
            </div>
            <a href="#" className="mb-1 block text-lg font-medium text-blue-700 hover:underline">
              {result.title}
            </a>
            <p className="text-sm text-gray-700">{result.description}</p>

            {/* Additional information for some results */}
            {result.additionalLinks && (
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {result.additionalLinks.map((link, j) => (
                  <a key={j} href="#" className="text-blue-700 hover:underline">
                    {link}
                  </a>
                ))}
              </div>
            )}

            {/* Image results for some queries */}
            {result.images && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {result.images.map((img, j) => (
                  <img key={j} src={img || "/placeholder.svg"} alt="" className="h-20 w-32 rounded object-cover" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related searches */}
      <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-lg font-medium">Related searches</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {searchResults.relatedSearches.map((related, i) => (
            <div key={i} className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              <Search className="mr-2 h-4 w-4 text-gray-500" />
              {related}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-1 text-sm">
        <span className="font-medium text-blue-600">1</span>
        {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
          <a key={page} href="#" className="px-3 py-2 text-blue-600 hover:underline">
            {page}
          </a>
        ))}
        <a href="#" className="px-3 py-2 text-blue-600 hover:underline">
          Next &gt;
        </a>
      </div>
    </div>
  )
}

// Add this function to generate mock search results based on the query
function generateSearchResults(query: string) {
  // Default values
  const results = []
  const relatedSearches = []

  // Generate search time (random between 0.1 and 0.9)
  const searchTime = (Math.random() * 0.8 + 0.1).toFixed(2)

  // Generate total results (random large number)
  const totalResults = Math.floor(Math.random() * 900000000) + 100000000

  // Generate related searches based on the query
  const queryWords = query.toLowerCase().split(" ")

  if (queryWords.includes("javascript") || queryWords.includes("js")) {
    relatedSearches.push(
      "javascript tutorial",
      "javascript vs typescript",
      "javascript frameworks",
      "javascript for beginners",
      "javascript jobs",
      "javascript array methods",
    )

    results.push(
      {
        url: "developer.mozilla.org › Web › JavaScript",
        title: "JavaScript | MDN Web Docs",
        description:
          "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages...",
        favicon: "/placeholder.svg?height=16&width=16",
        additionalLinks: ["JavaScript Guide", "JavaScript Reference", "Tutorials"],
      },
      {
        url: "w3schools.com › js",
        title: "JavaScript Tutorial - W3Schools",
        description:
          "JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
        favicon: "/placeholder.svg?height=16&width=16",
        additionalLinks: ["JavaScript Examples", "JavaScript Reference", "JavaScript Quiz"],
      },
      {
        url: "javascript.info",
        title: "The Modern JavaScript Tutorial",
        description:
          "Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object-oriented programming and more.",
        favicon: "/placeholder.svg?height=16&width=16",
      },
    )
  } else if (queryWords.includes("react") || queryWords.includes("reactjs")) {
    relatedSearches.push(
      "react js tutorial",
      "react vs angular",
      "react native",
      "react hooks",
      "react components",
      "react state management",
    )

    results.push(
      {
        url: "reactjs.org",
        title: "React – A JavaScript library for building user interfaces",
        description:
          "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
        favicon: "/placeholder.svg?height=16&width=16",
        additionalLinks: ["Getting Started", "Tutorial", "Blog", "Community"],
      },
      {
        url: "github.com › facebook › react",
        title:
          "GitHub - facebook/react: A declarative, efficient, and flexible JavaScript library for building user interfaces.",
        description:
          "A declarative, efficient, and flexible JavaScript library for building user interfaces. - GitHub - facebook/react",
        favicon: "/placeholder.svg?height=16&width=16",
      },
    )
  } else if (queryWords.includes("next") || queryWords.includes("nextjs")) {
    relatedSearches.push(
      "next.js vs react",
      "next.js tutorial",
      "next.js app router",
      "next.js server components",
      "next.js deployment",
      "next.js examples",
    )

    results.push(
      {
        url: "nextjs.org",
        title: "Next.js by Vercel - The React Framework",
        description:
          "Next.js by Vercel is the React framework for production - it gives you the best developer experience with all the features you need for production.",
        favicon: "/placeholder.svg?height=16&width=16",
        additionalLinks: ["Documentation", "Learn", "Showcase", "Blog"],
      },
      {
        url: "vercel.com › solutions › nextjs",
        title: "Next.js - The React Framework for the Web | Vercel",
        description:
          "Next.js is the React framework for production. It gives you the best developer experience with all the features you need for production.",
        favicon: "/placeholder.svg?height=16&width=16",
      },
    )
  } else if (queryWords.includes("cat") || queryWords.includes("cats") || queryWords.includes("kitten")) {
    relatedSearches.push("cat breeds", "cute kittens", "cat care tips", "cat behavior", "cat food", "cat toys")

    results.push(
      {
        url: "wikipedia.org › wiki › Cat",
        title: "Cat - Wikipedia",
        description:
          "The cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat to distinguish it from the wild members of the family.",
        favicon: "/placeholder.svg?height=16&width=16",
      },
      {
        url: "aspca.org › pet-care › cat-care",
        title: "Cat Care | ASPCA",
        description:
          "Check out our expert advice on cat care, including grooming, training, health, nutrition and more. Find everything you need to know about caring for your cat.",
        favicon: "/placeholder.svg?height=16&width=16",
      },
      {
        url: "petfinder.com › cats",
        title: "Cats & Kittens for Adoption - Petfinder",
        description:
          "Looking for a cat or kitten? Search for adoptable pets at shelters and rescues, and adopt your new Cat.",
        favicon: "/placeholder.svg?height=16&width=16",
        images: [
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
        ],
      },
    )
  } else {
    // Generic results for any other query
    relatedSearches.push(
      `${query} tutorial`,
      `${query} examples`,
      `${query} meaning`,
      `${query} vs alternative`,
      `best ${query}`,
      `${query} near me`,
    )

    results.push(
      {
        url: `wikipedia.org › wiki › ${query.replace(/\s+/g, "_")}`,
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Wikipedia`,
        description: `Comprehensive information about ${query}, including its history, characteristics, and significance in various contexts.`,
        favicon: "/placeholder.svg?height=16&width=16",
      },
      {
        url: `example.com › ${query.replace(/\s+/g, "-")}`,
        title: `Everything You Need to Know About ${query.charAt(0).toUpperCase() + query.slice(1)}`,
        description: `Discover the most comprehensive guide to ${query}. Learn about the origins, benefits, and practical applications in everyday life.`,
        favicon: "/placeholder.svg?height=16&width=16",
      },
      {
        url: `youtube.com › results?search_query=${query.replace(/\s+/g, "+")}`,
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} - YouTube`,
        description: `Watch videos about ${query} from creators around the world. Find tutorials, reviews, and educational content.`,
        favicon: "/placeholder.svg?height=16&width=16",
      },
    )
  }

  // Add a few more generic results to ensure we have at least 5
  while (results.length < 5) {
    results.push({
      url: `example${results.length}.com › ${query.replace(/\s+/g, "-")}`,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Result ${results.length + 1}`,
      description: `This is a sample search result for "${query}". It contains information that would be relevant to your search query.`,
      favicon: "/placeholder.svg?height=16&width=16",
    })
  }

  return {
    results,
    relatedSearches,
    searchTime,
    totalResults,
  }
}

function GenericWebpage({ url }: { url: string }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0]

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-8">
      <div className="mb-8 text-center">
        <div className="mb-2 text-2xl font-bold">{domain}</div>
        <div className="text-gray-500">{url}</div>
      </div>
      <div className="max-w-2xl text-center">
        <p className="mb-4">
          This is a simulated webpage for {domain}. In a real browser, this would display the actual content from this
          website.
        </p>
        <p className="text-sm text-gray-500">
          Due to security restrictions, our browser simulation cannot load external websites directly. This is a
          placeholder representation of what the page might look like.
        </p>
      </div>
    </div>
  )
}
