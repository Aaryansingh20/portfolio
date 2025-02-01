import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCw, Sun, Cloud, CloudRain, Wind } from 'lucide-react'

export default function Weather() {
  const [weather, setWeather] = useState({ temp: 0, condition: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = () => {
    setLoading(true)
    // Simulating API call with setTimeout
    setTimeout(() => {
      setWeather({
        temp: Math.floor(Math.random() * 30) + 10, // Random temp between 10 and 40
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)]
      })
      setLoading(false)
    }, 1000)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="w-16 h-16 text-yellow-400" />
      case 'Cloudy':
        return <Cloud className="w-16 h-16 text-gray-400" />
      case 'Rainy':
        return <CloudRain className="w-16 h-16 text-blue-400" />
      case 'Windy':
        return <Wind className="w-16 h-16 text-teal-400" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      {loading ? (
        <div className="flex flex-col items-center">
          <RefreshCw className="w-12 h-12 animate-spin mb-4" />
          <p className="text-xl">Loading weather data...</p>
        </div>
      ) : (
        <>
          <div className="text-6xl font-bold mb-4">{weather.temp}°C</div>
          <div className="text-3xl mb-6">{weather.condition}</div>
          {getWeatherIcon(weather.condition)}
          <Button 
            onClick={fetchWeather}
            className="mt-8 bg-white text-blue-600 hover:bg-blue-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </>
      )}
    </div>
  )
}
