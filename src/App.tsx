import React from 'react'
import { Main } from './components/Main'
import { useFirebase } from './hooks/useFirebase'
import { JoinFirebase } from './components/JoinFirebase'
import { FIREBASE_AUTH } from './utils/features'

const FireApp = () => {
  useFirebase()

  return (
    <JoinFirebase>
      <Main />
    </JoinFirebase>
  )
}

const App = () => {
  if (FIREBASE_AUTH) {
    return <FireApp />
  }

  return <Main />
}

export default App
