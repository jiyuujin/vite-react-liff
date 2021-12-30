import React from 'react'
import { useAuth } from '../plugins/firebase'

type Props = {
  //
}

export const SignOutButton = (props: Props) => {
  const handleClick = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth()

    auth.signOut()
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
