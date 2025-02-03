"use client"

import { useState } from "react"
import { Search, Sun, Moon, CloudDrizzle, Wind, Droplets, Cloud, CloudRain, CloudSnow } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface WeatherMetric {
  day: string
  temp: number
  icon: string
}

export default function WeatherDashboard() {
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 12,
      condition: "Mostly Cloudy",
      rain: "30%",
      time: "16:00",
      location: "New York, NY, USA",
    },
    metrics: {
      uvIndex: 5,
      windSpeed: 7.7,
      windDirection: "WSW",
      humidity: 12,
      visibility: 5.2,
      airQuality: 105,
      sunrise: "6:35 AM",
      sunset: "5:42 PM",
    },
    hourly: [
      { time: "12 PM", temp: 11, icon: "cloudy" },
      { time: "1 PM", temp: 12, icon: "cloudy" },
      { time: "2 PM", temp: 12, icon: "cloudy" },
      { time: "3 PM", temp: 13, icon: "partly-cloudy" },
      { time: "4 PM", temp: 13, icon: "partly-cloudy" },
      { time: "5 PM", temp: 12, icon: "cloudy" },
      { time: "6 PM", temp: 11, icon: "cloudy" },
      { time: "7 PM", temp: 10, icon: "cloudy" },
    ],
    weekly: [
      { day: "Sun", temp: 15, icon: "sunny" },
      { day: "Mon", temp: 12, icon: "cloudy" },
      { day: "Tue", temp: 9, icon: "drizzle" },
      { day: "Wed", temp: 8, icon: "rain" },
      { day: "Thu", temp: 5, icon: "snow" },
      { day: "Fri", temp: 4, icon: "sunny" },
      { day: "Sat", temp: 3, icon: "sunny" },
    ],
  })

  const getWeatherIcon = (type: string, className = "w-6 h-6") => {
    const iconProps = { className }
    switch (type) {
      case "sunny":
        return <Sun {...iconProps} className={`${className} text-yellow-400`} />
      case "cloudy":
        return <Cloud {...iconProps} className={`${className} text-gray-400`} />
      case "partly-cloudy":
        return <CloudDrizzle {...iconProps} className={`${className} text-gray-400`} />
      case "drizzle":
      case "rain":
        return <CloudRain {...iconProps} className={`${className} text-blue-400`} />
      case "snow":
        return <CloudSnow {...iconProps} className={`${className} text-blue-200`} />
      default:
        return <Sun {...iconProps} className={`${className} text-yellow-400`} />
    }
  }

  const getUVIndexColor = (index: number) => {
    if (index <= 2) return "bg-green-500"
    if (index <= 5) return "bg-yellow-500"
    if (index <= 7) return "bg-orange-500"
    if (index <= 10) return "bg-red-500"
    return "bg-purple-500"
  }

  const getUVIndexText = (index: number) => {
    if (index <= 2) return "Low"
    if (index <= 5) return "Moderate"
    if (index <= 7) return "High"
    if (index <= 10) return "Very High"
    return "Extreme"
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10 pr-4 py-2 w-full rounded-full border-input" placeholder="Search for places ..." />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 p-0 bg-white"
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
            >
              °{unit}
            </Button>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="col-span-4 p-6">
            <div className="flex items-center justify-center mb-6">
              {getWeatherIcon(weatherData.current.condition.toLowerCase(), "w-32 h-32")}
            </div>
            <div className="text-center">
              <h1 className="text-7xl font-light mb-4">
                {weatherData.current.temp}°{unit}
              </h1>
              <p className="text-gray-600 mb-2">Monday, {weatherData.current.time}</p>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                <CloudDrizzle className="w-4 h-4" />
                <span>{weatherData.current.condition}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
                <Droplets className="w-4 h-4" />
                <span>Rain - {weatherData.current.rain}</span>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80"
                  alt="City"
                  height={0}
                  width={50}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute bottom-2 left-2 text-white text-sm">{weatherData.current.location}</div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-8 p-6 text-black">
            <Tabs defaultValue="week" className="mb-8 text-black">
              <TabsList className="grid w-full grid-cols-2 text-black bg-white">
                <TabsTrigger className="data-[state=active]:bg-gray-100 text-black" value="today">
                  Today
                </TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-gray-100 text-black" value="week">
                  Week
                </TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="mt-4">
                <div className="grid grid-cols-8 gap-4">
                  {weatherData.hourly.map((hour) => (
                    <div key={hour.time} className="text-center">
                      <p className="text-gray-600 mb-2">{hour.time}</p>
                      <div className="mb-2">{getWeatherIcon(hour.icon)}</div>
                      <p className="text-sm">{hour.temp}°</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="week" className="mt-4">
                <div className="grid grid-cols-7 gap-4">
                  {weatherData.weekly.map((day) => (
                    <div key={day.day} className="text-center">
                      <p className="text-gray-600 mb-2">{day.day}</p>
                      <div className="mb-2">{getWeatherIcon(day.icon)}</div>
                      <p className="text-sm">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <h2 className="text-xl text-black font-semibold mb-4">Today&apos;s Highlights</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-2">UV Index</p>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl text-black font-semibold mb-2">{weatherData.metrics.uvIndex}</span>
                    <div className="w-full bg-gray-200 text-blackrounded-full h-2.5 mb-2">
                      <div
                        className={`h-2.5 text-black rounded-full ${getUVIndexColor(weatherData.metrics.uvIndex)}`}
                        style={{ width: `${(weatherData.metrics.uvIndex / 11) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {getUVIndexText(weatherData.metrics.uvIndex)}
                    </span>
                  </div>
                </Card>

                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-2">Wind Status</p>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-semibold mb-2">
                      {weatherData.metrics.windSpeed}
                      <span className="text-xl font-normal ml-1">km/h</span>
                    </div>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-200 mb-2">
                      <Wind
                        className="w-10 h-10 text-blue-500"
                        style={{
                          transform: `rotate(${
                            { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 }[
                              weatherData.metrics.windDirection
                            ] || 0
                          }deg)`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500">{weatherData.metrics.windDirection}</span>
                  </div>
                </Card>

                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Sunrise & Sunset</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span>{weatherData.metrics.sunrise}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Moon className="w-4 h-4 text-gray-400" />
                      <span>{weatherData.metrics.sunset}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Humidity</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold">{weatherData.metrics.humidity}%</span>
                    <span className="text-sm text-gray-600">Normal</span>
                  </div>
                </Card>

                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Visibility</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold">{weatherData.metrics.visibility}</span>
                    <span className="text-sm text-gray-600">km</span>
                  </div>
                </Card>

                <Card className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Air Quality</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold">{weatherData.metrics.airQuality}</span>
                    <span className="text-sm text-red-500">Unhealthy</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

