const OPENAI_AUDIO_TRANSCRIPTIONS_API =
  'https://api.openai.com/v1/audio/transcriptions'
const OPENAI_SECRET = import.meta.env.VITE_APP_OPENAI_SECRET

export const useAudioTranscription = () => {
  const request = async (blob: Blob): Promise<string | undefined> => {
    let result = ''

    const file = new Blob([blob], {
      type: 'audio/mp3',
    })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('model', 'whisper-1')

    const res = await fetch(OPENAI_AUDIO_TRANSCRIPTIONS_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_SECRET}`,
      },
      body: formData,
    })

    const data = await res.json()
    result = data.text

    return result
  }

  return { request }
}
