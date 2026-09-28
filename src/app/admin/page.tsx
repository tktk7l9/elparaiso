'use client'

import dynamic from 'next/dynamic'
import Loading from '../loading'

// Show the shared loading text while the client-only chunk loads, instead of a blank page.
const AdminContent = dynamic(() => import('./AdminContent'), {
  ssr: false,
  loading: () => <Loading />,
})

export default function Admin() {
  return <AdminContent />
}
