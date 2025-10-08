"use client"

import { useEffect, type RefObject } from "react"

type Event = MouseEvent | TouchEvent

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  triggerRef?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      const triggerEl = triggerRef?.current
      const target = event?.target as Node

      if (!el || el.contains(target) || (triggerEl && triggerEl.contains(target))) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler, triggerRef])
}