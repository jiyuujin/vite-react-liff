import { useState } from 'react'
import { useAudioTranscription } from './useAudioTranscription'

export function useAudioForm() {
  const [answer, setAnswer] = useState('')

  const { request } = useAudioTranscription()

  const onSubmit = async (blob: Blob | undefined) => {
    if (!blob) return

    const res = await request(blob)
    setAnswer(res || '')
  }

  return { answer, onSubmit }
}
