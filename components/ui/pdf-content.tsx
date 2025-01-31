"use client"

import { useEffect, useRef } from "react"

export default function PDFContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to A4 dimensions at 96 DPI
    canvas.width = 794 // A4 width in pixels at 96 DPI
    canvas.height = 1123 // A4 height in pixels at 96 DPI

    // Set background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add pink gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(255, 192, 203, 0.1)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set text properties
    ctx.fillStyle = "#333333"
    ctx.font = "bold 48px 'Courier New'"

    // Draw header
    ctx.fillText("Portfolio '24", 60, 100)

    // Draw name
    ctx.font = "32px 'Courier New'"
    ctx.fillText("Your Name", 60, 160)

    // Draw separator line
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(60, 200)
    ctx.lineTo(734, 200)
    ctx.stroke()

    // Draw sections
    const drawSection = (title: string, content: string, y: number) => {
      ctx.font = "bold 24px 'Courier New'"
      ctx.fillText(title, 60, y)
      ctx.font = "16px 'Courier New'"
      const words = content.split(" ")
      let line = ""
      let lineY = y + 30

      words.forEach((word) => {
        const testLine = line + word + " "
        const metrics = ctx.measureText(testLine)
        if (metrics.width > 674) {
          ctx.fillText(line, 60, lineY)
          line = word + " "
          lineY += 24
        } else {
          line = testLine
        }
      })
      ctx.fillText(line, 60, lineY)
      return lineY
    }

    // Add content sections
    let currentY = 250
    currentY =
      drawSection(
        "About Me",
        "I'm a software engineer with a passion for creating elegant solutions to complex problems. " +
          "Currently working on cutting-edge web applications and exploring new technologies.",
        currentY,
      ) + 50

    currentY =
      drawSection(
        "Experience",
        "Senior Software Engineer at Tech Corp (2020-Present)\n" +
          "Full Stack Developer at Innovation Labs (2018-2020)\n" +
          "Junior Developer at StartUp Inc (2016-2018)",
        currentY,
      ) + 50

    currentY =
      drawSection("Skills", "JavaScript • TypeScript • React • Node.js • Python • SQL • AWS • Docker • Git", currentY) +
      50

    currentY =
      drawSection(
        "Projects",
        "• Modern Windows UI Clone - A pixel-perfect recreation of the Windows interface\n" +
          "• E-commerce Platform - Full stack application with real-time updates\n" +
          "• AI Chat Application - Natural language processing implementation",
        currentY,
      ) + 50

    // Draw contact section at the bottom
    ctx.font = "16px 'Courier New'"
    ctx.fillText("Contact: your.email@example.com • github.com/yourusername", 60, 1050)

    // Draw page number
    ctx.font = "12px 'Courier New'"
    ctx.fillText("1/1", canvas.width - 60, canvas.height - 40)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full shadow-lg"
        style={{ width: "794px", height: "1123px" }}
      />
    </div>
  )
}

