import React from 'react'

type Props = {
  sendMessages: () => void
}

export const SendMessagesButton = (props: Props) => {
  const { sendMessages } = props
  const handleClick = () => {
    sendMessages()
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    >
      Send Messages
    </button>
  )
}
