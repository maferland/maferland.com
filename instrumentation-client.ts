import { env } from '@/lib/env'
import posthog from 'posthog-js'

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
})
