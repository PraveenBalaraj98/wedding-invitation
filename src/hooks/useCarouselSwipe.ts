import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Horizontal carousel gesture used by the photographs and the event cards.
 * A vertical movement is left to the page. A small horizontal movement does
 * not count as a swipe, so taps on links and buttons still activate.
 */
export function useCarouselSwipe({
  index,
  count,
  onChange,
  allowFromControls = false,
}: {
  index: number
  count: number
  onChange: (next: number) => void
  allowFromControls?: boolean
}) {
  const reduced = useReducedMotion()
  const drag = useRef({ id: -1, x: 0, y: 0, dx: 0, axis: "" as "" | "x" | "y" })
  const dragged = useRef(false)
  const wheeled = useRef(0)
  const [offset, setOffset] = useState(0)
  const last = count - 1

  function go(next: number) {
    if (next < 0 || next > last) return
    onChange(next)
  }

  function onControl(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, label"))
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return
    if (!allowFromControls && onControl(event.target)) {
      dragged.current = false
      drag.current.id = -1
      return
    }
    dragged.current = false
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, axis: "" }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.id) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (!drag.current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      drag.current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
      if (drag.current.axis === "y") {
        drag.current.id = -1
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (drag.current.axis !== "x") return
    drag.current.dx = dx
    setOffset(dx)
  }

  function finishDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.id && drag.current.axis !== "x") return
    const dx = event.pointerId === drag.current.id ? event.clientX - drag.current.x : drag.current.dx
    const horizontal = drag.current.axis === "x"
    drag.current.id = -1
    drag.current.axis = ""
    setOffset(0)
    if (!horizontal || Math.abs(dx) < 40) {
      dragged.current = false
      return
    }
    dragged.current = true
    const root = event.currentTarget
    const stopFollowingClick = (click: MouseEvent) => {
      window.removeEventListener("click", stopFollowingClick, true)
      dragged.current = false
      if (!root.contains(click.target as Node)) return
      if (onControl(click.target)) {
        click.preventDefault()
        click.stopPropagation()
      }
    }
    window.addEventListener("click", stopFollowingClick, true)
    window.setTimeout(() => {
      window.removeEventListener("click", stopFollowingClick, true)
      dragged.current = false
    }, 400)
    go(dx < 0 ? index + 1 : index - 1)
  }

  function onWheel(event: WheelEvent) {
    if (Math.abs(event.deltaX) < 30 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return
    const now = Date.now()
    if (now - wheeled.current < 450) return
    wheeled.current = now
    go(event.deltaX > 0 ? index + 1 : index - 1)
  }

  return {
    go,
    regionProps: {
      tabIndex: 0 as const,
      onWheel,
      onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") go(index - 1)
        if (event.key === "ArrowRight") go(index + 1)
      },
    },
    viewportProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
    trackClassName: `carousel-track${reduced || offset !== 0 ? " is-instant" : ""}`,
    trackStyle: { transform: `translateX(calc(${-index} * var(--slide-step) + ${offset}px))` },
  }
}
