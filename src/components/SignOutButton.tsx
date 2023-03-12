import React from 'react'

type Props = {
  logout: () => void;
};

export const SignOutButton = (props: Props) => {
  const { logout } = props

  return (
    <button
      onClick={logout}
      type="button"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  )
}
