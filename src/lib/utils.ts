import { twMerge, twJoin } from 'tailwind-merge'

export { twMerge, twJoin }

// Utility function for conditional classes with proper merging
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return twMerge(twJoin(...(inputs.filter(Boolean) as string[])))
}
