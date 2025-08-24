import { useEffect, RefObject } from 'react'

/**
 * Hook that handles clicks outside of the referenced element
 * @param ref - React ref object for the element to detect clicks outside of
 * @param handler - Function to call when click outside is detected
 * @param active - Whether the hook should be active (default: true)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, handler, active])
}
