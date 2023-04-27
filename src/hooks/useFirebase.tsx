import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { setupFirebase, initialize } from '../plugins/firebase'
import { useSignIn, useSignOut } from '../contexts/UserContext'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

export const useFirebase = () => {
  const provider = new GoogleAuthProvider()
  const [auth, setAuth] = useState<any | undefined>()
  const { signIn } = useSignIn()
  const { signOut } = useSignOut()

  const login = () => {
    signInWithRedirect(auth, provider)
  }

  const logout = () => {
    auth.signOut()
  }

  useEffect(() => {
    setupFirebase()

    const _auth = initialize()
    setAuth(_auth)

    onAuthStateChanged(_auth, (user) => {
      if (user) {
        signIn(user)
      } else {
        signOut()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout }
}
