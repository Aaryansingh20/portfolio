"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useWindows } from "@/context/WindowsContext"

interface DragState {
  isDragging: boolean
  dragOffset: { x: number; y: number }
}

export const useWindowDrag = () => {
  const { setOpenApps, activeWindow } = useWindows()
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
  })

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>, appName: string) => {
    if (e.target instanceof HTMLElement && (e.target.closest(".window-controls") || e.target.closest("button"))) {
      return
    }

    setDragState({
      isDragging: true,
      dragOffset: {
        x: e.clientX - e.currentTarget.getBoundingClientRect().left,
        y: e.clientY - e.currentTarget.getBoundingClientRect().top,
      },
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragState.isDragging && activeWindow) {
        const newX = e.clientX - dragState.dragOffset.x
        const newY = e.clientY - dragState.dragOffset.y

        setOpenApps((prevApps) =>
          prevApps.map((app) => (app.name === activeWindow ? { ...app, position: { x: newX, y: newY } } : app)),
        )
      }
    },
    [dragState, activeWindow, setOpenApps],
  )

  const handleMouseUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  useEffect(() => {
    if (dragState.isDragging) {
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
  }, [dragState.isDragging, handleMouseMove, handleMouseUp])

  return { handleMouseDown }
}
