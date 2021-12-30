import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { setupFirebase } from '../plugins/firebase'
import { Router } from '../routes/Router'
import { useSignIn, useSignOut } from '../contexts/UserContext'

export const Main = () => {
  const { signIn } = useSignIn()
  const { signOut } = useSignOut()

  useEffect(() => {
    setupFirebase()

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        signIn(user)
      } else {
        signOut()
      }
    })
  }, [])

  return (
    <main>
      <Router />
    </main>
  )
}
