import { useState } from 'react'
import { useChatCompletion } from './useChatCompletion'

export const useChatForm = () => {
  const [answer, setAnswer] = useState('')
  const { fetchCompletions } = useChatCompletion()

  const search = async (input: string) => {
    if (!input) {
      alert('Please input something.')
      return
    }

    const res = await fetchCompletions([
      {
        role: 'user',
        content: input,
      },
    ])
    setAnswer(res?.content || '')
  }

  return { answer, search }
}
