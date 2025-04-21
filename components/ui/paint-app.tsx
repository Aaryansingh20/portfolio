"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Circle,
  Download,
  Eraser,
  Pencil,
  RotateCcw,
  RotateCw,
  Square,
  PenLineIcon as StraightLine,
  Trash2,
  Pipette,
  PaintBucket,
} from "lucide-react"

type Tool = "pencil" | "line" | "rectangle" | "circle" | "eraser" | "fill" | "picker"
type DrawingAction = {
  tool: Tool
  color: string
  size: number
  path?: { x: number; y: number }[]
  startX?: number
  startY?: number
  endX?: number
  endY?: number
  fill?: boolean
}

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF")
  const [size, setSize] = useState([3])
  const [tool, setTool] = useState<Tool>("pencil")
  const [actions, setActions] = useState<DrawingAction[]>([])
  const [redoActions, setRedoActions] = useState<DrawingAction[]>([])
  const [currentAction, setCurrentAction] = useState<DrawingAction | null>(null)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [fillShape, setFillShape] = useState(false)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size to match its display size
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const context = canvas.getContext("2d")
    if (context) {
      context.lineCap = "round"
      context.lineJoin = "round"
      // Fill canvas with white background
      context.fillStyle = "#FFFFFF"
      context.fillRect(0, 0, canvas.width, canvas.height)
      setCtx(context)
    }

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Redraw canvas when actions change
  useEffect(() => {
    if (!ctx || !canvasRef.current) return

    // Clear canvas and fill with white
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Redraw all actions
    actions.forEach((action) => {
      drawAction(ctx, action)
    })
  }, [actions, ctx])

  const drawAction = (context: CanvasRenderingContext2D, action: DrawingAction) => {
    context.strokeStyle = action.color
    context.lineWidth = action.size

    if (action.tool === "eraser") {
      context.strokeStyle = "#FFFFFF"
    }

    context.beginPath()

    if (action.tool === "pencil" || action.tool === "eraser") {
      if (!action.path || action.path.length < 2) return

      context.moveTo(action.path[0].x, action.path[0].y)
      for (let i = 1; i < action.path.length; i++) {
        context.lineTo(action.path[i].x, action.path[i].y)
      }
    } else if (
      action.tool === "line" &&
      action.startX !== undefined &&
      action.startY !== undefined &&
      action.endX !== undefined &&
      action.endY !== undefined
    ) {
      context.moveTo(action.startX, action.startY)
      context.lineTo(action.endX, action.endY)
    } else if (
      action.tool === "rectangle" &&
      action.startX !== undefined &&
      action.startY !== undefined &&
      action.endX !== undefined &&
      action.endY !== undefined
    ) {
      const width = action.endX - action.startX
      const height = action.endY - action.startY

      if (action.fill) {
        context.fillStyle = action.color
        context.fillRect(action.startX, action.startY, width, height)
      }
      context.rect(action.startX, action.startY, width, height)
    } else if (
      action.tool === "circle" &&
      action.startX !== undefined &&
      action.startY !== undefined &&
      action.endX !== undefined &&
      action.endY !== undefined
    ) {
      const radiusX = Math.abs(action.endX - action.startX) / 2
      const radiusY = Math.abs(action.endY - action.startY) / 2
      const centerX = Math.min(action.startX, action.endX) + radiusX
      const centerY = Math.min(action.startY, action.endY) + radiusY

      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)

      if (action.fill) {
        context.fillStyle = action.color
        context.fill()
      }
    } else if (action.tool === "fill") {
      // Fill is handled separately with flood fill algorithm
    }

    context.stroke()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return

    setIsDrawing(true)
    setRedoActions([])

    const { x, y } = getCoordinates(e)
    setStartPos({ x, y })

    // Handle right click for secondary color
    const isRightClick = "button" in e && e.button === 2
    const currentColor = isRightClick ? secondaryColor : primaryColor

    if (tool === "picker") {
      // Get color at click position
      const pixel = ctx.getImageData(x, y, 1, 1).data
      const color = `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`
      if (isRightClick) {
        setSecondaryColor(color)
      } else {
        setPrimaryColor(color)
      }
      return
    }

    if (tool === "fill") {
      // Simple implementation - in a real app, you'd use a flood fill algorithm
      if (canvasRef.current) {
        ctx.fillStyle = currentColor
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        setActions((prev) => [
          ...prev,
          {
            tool: "fill",
            color: currentColor,
            size: size[0],
          },
        ])
      }
      return
    }

    if (tool === "pencil" || tool === "eraser") {
      const newAction: DrawingAction = {
        tool,
        color: currentColor,
        size: size[0],
        path: [{ x, y }],
      }
      setCurrentAction(newAction)
    } else {
      const newAction: DrawingAction = {
        tool,
        color: currentColor,
        size: size[0],
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        fill: fillShape,
      }
      setCurrentAction(newAction)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !currentAction || !canvasRef.current) return

    const { x, y } = getCoordinates(e)

    if (tool === "pencil" || tool === "eraser") {
      // Update the current action's path
      setCurrentAction((prev) => {
        if (!prev) return null
        return {
          ...prev,
          path: [...(prev.path || []), { x, y }],
        }
      })

      // Draw the line segment
      ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : currentAction.color
      ctx.lineWidth = size[0]
      ctx.beginPath()

      if (currentAction.path && currentAction.path.length > 0) {
        const lastPoint = currentAction.path[currentAction.path.length - 1]
        ctx.moveTo(lastPoint.x, lastPoint.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    } else if (tool !== "picker" && tool !== "fill") {
      // For shapes, we'll redraw the entire canvas on each move
      if (!startPos) return

      // Update current action with new end position
      setCurrentAction((prev) => {
        if (!prev) return null
        return {
          ...prev,
          endX: x,
          endY: y,
        }
      })

      // Redraw the canvas
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      // Draw all previous actions
      actions.forEach((action) => {
        drawAction(ctx, action)
      })

      // Draw the current shape
      ctx.strokeStyle = currentAction.color
      ctx.lineWidth = size[0]
      ctx.beginPath()

      if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y)
        ctx.lineTo(x, y)
      } else if (tool === "rectangle") {
        const width = x - startPos.x
        const height = y - startPos.y

        if (fillShape) {
          ctx.fillStyle = currentAction.color
          ctx.fillRect(startPos.x, startPos.y, width, height)
        }
        ctx.rect(startPos.x, startPos.y, width, height)
      } else if (tool === "circle") {
        const radiusX = Math.abs(x - startPos.x) / 2
        const radiusY = Math.abs(y - startPos.y) / 2
        const centerX = Math.min(startPos.x, x) + radiusX
        const centerY = Math.min(startPos.y, y) + radiusY

        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)

        if (fillShape) {
          ctx.fillStyle = currentAction.color
          ctx.fill()
        }
      }

      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing || !currentAction) return

    setIsDrawing(false)
    setActions((prev) => [...prev, currentAction])
    setCurrentAction(null)
    setStartPos(null)
  }

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 }

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setActions([])
    setRedoActions([])
  }

  const undo = () => {
    if (actions.length === 0) return

    const lastAction = actions[actions.length - 1]
    setRedoActions((prev) => [...prev, lastAction])
    setActions((prev) => prev.slice(0, -1))
  }

  const redo = () => {
    if (redoActions.length === 0) return

    const actionToRedo = redoActions[redoActions.length - 1]
    setActions((prev) => [...prev, actionToRedo])
    setRedoActions((prev) => prev.slice(0, -1))
  }

  const saveCanvas = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = "paint-artwork.png"
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the context menu from appearing
  }

  const colorOptions = [
    "#000000",
    "#7F7F7F",
    "#880015",
    "#ED1C24",
    "#FF7F27",
    "#FFF200",
    "#22B14C",
    "#00A2E8",
    "#3F48CC",
    "#A349A4",
    "#FFFFFF",
    "#C3C3C3",
    "#B97A57",
    "#FFAEC9",
    "#FFC90E",
    "#EFE4B0",
    "#B5E61D",
    "#99D9EA",
    "#7092BE",
    "#C8BFE7",
  ]

  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-sm overflow-hidden bg-gray-100">
      {/* Simplified Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-200 border-b border-gray-300 items-center">
        <Button
          variant={tool === "pencil" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("pencil")}
          title="Pencil"
          className="h-8 w-8 rounded-sm bg-white text-black"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("eraser")}
          title="Eraser"
          className="h-8 w-8 rounded-sm"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "fill" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("fill")}
          title="Fill"
          className="h-8 w-8 rounded-sm"
        >
          <PaintBucket className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "picker" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("picker")}
          title="Color Picker"
          className="h-8 w-8 rounded-sm"
        >
          <Pipette className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "line" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("line")}
          title="Line"
          className="h-8 w-8 rounded-sm"
        >
          <StraightLine className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "rectangle" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("rectangle")}
          title="Rectangle"
          className="h-8 w-8 rounded-sm"
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "circle" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTool("circle")}
          title="Circle"
          className="h-8 w-8 rounded-sm"
        >
          <Circle className="h-4 w-4" />
        </Button>

        <div className="flex items-center ml-1">
          <label className="flex items-center text-xs">
            <input type="checkbox" checked={fillShape} onChange={() => setFillShape(!fillShape)} className="mr-1" />
            Fill Shape
          </label>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs">Size:</span>
          <Slider value={size} min={1} max={20} step={1} onValueChange={setSize} className="w-24" />
          <span className="text-xs">{size[0]}px</span>
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={actions.length === 0}
            title="Undo"
            className="h-8 w-8 rounded-sm"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={redoActions.length === 0}
            title="Redo"
            className="h-8 w-8 rounded-sm"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={clearCanvas} title="Clear Canvas" className="h-8 w-8 rounded-sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={saveCanvas} title="Save Image" className="h-8 w-8 rounded-sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 overflow-hidden bg-gray-300 p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] touch-none bg-white border border-gray-400 shadow-inner"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onContextMenu={handleContextMenu}
        />
      </div>

      {/* Simplified Color Palette */}
      <div className="bg-gray-200 border-t border-gray-300 p-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div
              className="w-8 h-8 border-2 border-gray-800"
              style={{ backgroundColor: primaryColor }}
              title="Current Color"
            />
            <div className="text-xs">
              <div>Left click a color to select</div>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {colorOptions.map((c) => (
              <button
                key={c}
                className="w-6 h-6 border border-gray-400"
                style={{ backgroundColor: c }}
                onClick={() => setPrimaryColor(c)}
                title={c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
