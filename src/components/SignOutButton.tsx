import React from 'react'
import { useAuth } from '../plugins/firebase'
import { useSignOut } from '../contexts/UserContext'

type Props = {
  logout: () => void
}

export const SignOutButton = (props: Props) => {
  const { logout } = props
  const { signOut } = useSignOut()
  const auth = useAuth()
  const handleClick = () => {
    auth.signOut()
    signOut()
    logout()
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  )
}
