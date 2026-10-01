'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'
import { client } from 'src/libs/supabase'

// ThemeSupa's defaults (gray labels/links on white, white text on green) fall
// below 4.5:1, and its inputs show focus only by turning the border gray.
// Map them onto the grays the rest of the site already uses (button
// gray-800/700, labels gray-600, hover gray-500) so the login form reads the
// same as the site's own buttons, passes WCAG AA contrast, and the focused
// field is clearly marked by a dark border. The resting input border and the
// success/error messages are overridden too: ThemeSupa's lightgray border is
// 1.5:1 against white (needs 3:1) and its red error text is 2.76:1.
const AUTH_COLORS = {
  brand: '#1f2937',
  brandAccent: '#374151',
  brandButtonText: '#ffffff',
  defaultButtonText: '#1f2937',
  inputBorder: '#6b7280',
  inputBorderHover: '#4b5563',
  inputBorderFocus: '#1f2937',
  inputLabelText: '#4b5563',
  inputPlaceholder: '#6b7280',
  anchorTextColor: '#4b5563',
  anchorTextHoverColor: '#6b7280',
  messageText: '#166534',
  messageBackground: '#f0fdf4',
  messageBorder: '#bbf7d0',
  messageTextDanger: '#b91c1c',
  messageBackgroundDanger: '#fef2f2',
  messageBorderDanger: '#fecaca',
} as const

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
      <>
        <PageTitle>admin</PageTitle>
        <div className="flex justify-end mx-2 my-4">
          <button
            className="px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded"
            onClick={() => client.auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Headline />
      <PageTitle>admin</PageTitle>
      <div className="flex justify-center pt-8 text-left">
        <div className="w-full sm:w-96">
          <Auth
            supabaseClient={client}
            appearance={{ theme: ThemeSupa, variables: { default: { colors: AUTH_COLORS } } }}
            providers={['github', 'google']}
          />
        </div>
      </div>
    </>
  )
}
