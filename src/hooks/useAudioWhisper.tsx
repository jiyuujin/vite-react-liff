import { useEffect, useState } from 'react'
import { useAudioTranscription } from './useAudioTranscription'

interface UseAudioWhisperProps {
  blob: Blob | undefined;
}

export function useAudioWhisper({ blob }: UseAudioWhisperProps) {
  const [answer, setAnswer] = useState('')

  const { fetchTranscriptions } = useAudioTranscription()

  useEffect(() => {
    async () => {
      const res = await fetchTranscriptions(blob)
      setAnswer(res || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blob])

  return { answer }
}
