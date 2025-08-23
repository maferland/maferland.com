function initPostHog() {
  // Early return if not in browser
  if (typeof window === 'undefined') {
    return
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  // Early return with warning if key is missing
  if (!posthogKey) {
    console.warn('PostHog key not found in environment variables')
    return
  }

  try {
    // Dynamic import to avoid server-side issues
    import('posthog-js').then(posthog => {
      posthog.default.init(posthogKey, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        capture_exceptions: true,
        debug: process.env.NODE_ENV === 'development',
      })
    })
  } catch (error) {
    console.error('Failed to initialize PostHog:', error)
  }
}

initPostHog()
