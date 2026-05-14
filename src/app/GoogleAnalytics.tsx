'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { GA_TRACKING_ID, pageview } from 'src/libs/gtag'

export function GoogleAnalytics() {
  const pathname = usePathname()
  useEffect(() => {
    if (!GA_TRACKING_ID) return
    pageview(pathname)
  }, [pathname])
  return null
}
