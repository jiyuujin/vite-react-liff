import React from 'react'

type Props = {
  sendMessage: () => void
}

export const SendMessageButton = (props: Props) => {
  const { sendMessage } = props
  const handleClick = () => {
    sendMessage()
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    >
      Send Message
    </button>
  )
}
