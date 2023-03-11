import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as Carbon } from '../assets/carbon.svg'

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div className="flex gap-1">
      <textarea
        {...rest}
        onChange={onChange}
        rows={rows}
        className="grid border border-solid border-purple-500 focus:border-purple-700 text-black font-bold relative w-full rounded py-2 px-4"
      />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  )
}
