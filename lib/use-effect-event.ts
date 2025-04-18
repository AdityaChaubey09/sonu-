"use client"

import { useCallback, useRef } from "react"

// This is a polyfill for the upcoming useEffectEvent React hook
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(callback)

  // Update the ref when the callback changes
  ref.current = callback

  // Return a stable function that calls the latest callback
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args)
  }, []) as T
}

// Add this to React namespace to satisfy imports
if (typeof window !== "undefined") {
  // @ts-ignore - Add to React global namespace
  window.React = window.React || {}
  // @ts-ignore - Add useEffectEvent to React
  window.React.useEffectEvent = useEffectEvent
}
