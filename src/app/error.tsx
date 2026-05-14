'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
      <button
        onClick={reset}
        className="px-6 py-3 text-white bg-gray-800 hover:bg-gray-700"
      >
        再試行
      </button>
    </div>
  )
}
