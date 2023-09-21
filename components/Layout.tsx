import config from '@/config'
import {Inter} from 'next/font/google'
import NextNProgress from 'nextjs-progressbar'
import {ReactNode, useEffect, useState} from 'react'
import {Toaster} from 'react-hot-toast'
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import ErrorBoundary from './ErrorBoundary'

const font = Inter({subsets: ['latin']})

export default function Layout({children}: {children: ReactNode}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    // Most errors are catched in ErrorBondary to show a nice error page
    <ErrorBoundary>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      {/* Automatically show a progress bar at the top when navigating between pages */}
      <NextNProgress
        color={config.colors.main}
        options={{showSpinner: false}}
      />
      {children}
      {/* Show Success/Error messages anywhere from the app with toast() */}
      {isMounted && (
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
      )}
      {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </ErrorBoundary>
  )
}
