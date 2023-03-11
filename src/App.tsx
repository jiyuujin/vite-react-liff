import React from 'react'
import { Main } from './components/Main'
import { useFirebase } from './hooks/useFirebase'
import { JoinFirebase } from './components/JoinFirebase'

const App = () => {
  useFirebase()

  return (
    <JoinFirebase>
      <Main />
    </JoinFirebase>
  )
}

export default App
