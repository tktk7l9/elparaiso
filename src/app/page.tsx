import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'
import { Cards } from 'src/components/Cards'

export const metadata: Metadata = { title: { absolute: 'EL PARAISO' } }

export default function Home() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle visuallyHidden>EL PARAISO</PageTitle>
      <Cards />
    </main>
  )
}
