import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { setupFirebase } from './plugins/firebase'
import { AuthProvider, useSignIn, useSignOut } from './contexts/UserContext'
import { Main } from './components/Main'

const App = () => {
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

  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}

export default App
