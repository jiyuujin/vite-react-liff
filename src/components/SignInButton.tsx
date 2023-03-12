import React from 'react'

type Props = {
  login: () => void;
};

export const SignInButton = (props: Props) => {
  const { login } = props

  return (
    <button
      onClick={login}
      type="button"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign In With LINE
    </button>
  )
}
