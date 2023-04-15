import { useState } from 'react'
import { useChatCompletion } from './useChatCompletion'

export const useChatForm = () => {
  const [answer, setAnswer] = useState('')
  const { request } = useChatCompletion()

  const onSubmit = async (input: string) => {
    if (!input) {
      alert('Please input something.')
      return
    }

    const res = await request([
      {
        role: 'user',
        content: input,
      },
    ])
    setAnswer(res?.content || '')
  }

  return { answer, onSubmit }
}
