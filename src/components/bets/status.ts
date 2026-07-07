import type { BetStatus } from '@/lib/bets'

interface StatusMeta {
  label: string
  alive: boolean
}

export const STATUS: Record<BetStatus, StatusMeta> = {
  researching: {
    label: 'Researching',
    alive: true,
  },
  promising: {
    label: 'Exploring',
    alive: true,
  },
  building: {
    label: 'Building',
    alive: true,
  },
  live: {
    label: 'Live',
    alive: true,
  },
  killed: {
    label: 'Killed',
    alive: false,
  },
  parked: {
    label: 'Parked',
    alive: false,
  },
}
