import posthog from 'posthog-js'

const NEXT_PUBLIC_POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const NEXT_PUBLIC_POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST) {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    defaults: '2025-05-24',
  })
}
