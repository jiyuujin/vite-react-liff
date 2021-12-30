import React from 'react'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useAuth } from '../plugins/firebase'

export const SignInButton = () => {
  const handleClick = () => {
    const provider = new GoogleAuthProvider()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth()

    signInWithRedirect(auth, provider)
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign In With Google
    </button>
  )
}
