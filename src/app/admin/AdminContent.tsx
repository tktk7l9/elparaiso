'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Headline } from 'src/components/Headline'
import { client } from 'src/libs/supabase'

export default function AdminContent() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session) {
    return (
      <div className="flex justify-end mx-2 my-4">
        <button
          className="px-4 py-2 text-sm text-white bg-gray-800 rounded"
          onClick={() => client.auth.signOut()}
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <>
      <Headline />
      <div className="flex justify-center pt-8">
        <div className="w-full sm:w-96">
          <Auth
            supabaseClient={client}
            appearance={{ theme: ThemeSupa }}
            providers={['github', 'google']}
          />
        </div>
      </div>
    </>
  )
}
