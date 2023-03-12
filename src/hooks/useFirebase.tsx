import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { setupFirebase, useAuth } from '../plugins/firebase'
import { useSignIn, useSignOut } from '../contexts/UserContext'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

export const useFirebase = () => {
  const provider = new GoogleAuthProvider()
  const auth = useAuth()
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

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
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
