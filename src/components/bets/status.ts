import type { BetStatus } from '@/lib/bets'

interface StatusMeta {
  label: string
  emoji: string
  // Tailwind classes for the badge
  badge: string
  // Whether this status counts as a living bet (vs the graveyard)
  alive: boolean
}

export const STATUS: Record<BetStatus, StatusMeta> = {
  researching: {
    label: 'Researching',
    emoji: '🔬',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    alive: true,
  },
  promising: {
    label: 'Exploring',
    emoji: '🌱',
    badge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    alive: true,
  },
  building: {
    label: 'Building',
    emoji: '🔨',
    badge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    alive: true,
  },
  live: {
    label: 'Live',
    emoji: '🚀',
    badge:
      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    alive: true,
  },
  killed: {
    label: 'Killed',
    emoji: '💀',
    badge: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    alive: false,
  },
  parked: {
    label: 'Parked',
    emoji: '⏸️',
    badge: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    alive: false,
  },
}
