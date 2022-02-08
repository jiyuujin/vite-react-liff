import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { setupFirebase } from './plugins/firebase'
import { AuthProvider, useUser } from './contexts/UserContext'
import { Main } from './components/Main'

const App = () => {
  const { signIn, signOut } = useUser()

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
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}

export default App
