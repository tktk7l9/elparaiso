import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">ページが見つかりませんでした</p>
      <Link href="/" className="px-6 py-3 text-white bg-gray-800 hover:bg-gray-700">
        ホームへ戻る
      </Link>
    </div>
  )
}
