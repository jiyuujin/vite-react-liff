import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { setupFirebase } from '../plugins/firebase'
import { useSignIn, useSignOut } from '../contexts/UserContext'

export const useFirebase = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
