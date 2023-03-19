const OPENAPI_AUDIO_TRANSCRIPTIONS_API =
  'https://api.openai.com/v1/audio/transcriptions'
const OPENAPI_SECRET = import.meta.env.VITE_APP_OPENAPI_SECRET

export const useAudioTranscription = () => {
  const fetchTranscriptions = async (
    file: Blob | undefined
  ): Promise<string | undefined> => {
    const body = JSON.stringify({
      model: 'whisper-1',
      file,
    })

    const res = await fetch(OPENAPI_AUDIO_TRANSCRIPTIONS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'mutlipart/form-data',
        Authorization: `Bearer ${OPENAPI_SECRET}`,
      },
      body,
    })
    const data = await res.json()

    return data.text
  }

  return { fetchTranscriptions }
}
