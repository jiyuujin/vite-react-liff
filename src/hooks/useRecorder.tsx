import { useState, useEffect } from 'react'
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc'

export const useRecorder = () => {
  const [recorder, setRecorder] = useState<
    RecordRTCPromisesHandler | undefined
  >()
  const [blob, setBlob] = useState<Blob>()
  const [formData, setFormData] = useState<FormData>()

  const initializer = async (recorderType: RecordRTC.Options['type']) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: recorderType,
    })
    setRecorder(recorder)
  }

  const updateFormData = () => {
    if (!blob) return

    const file = new File([blob], 'test.mp3', {
      type: 'audio/mp3',
    })

    const data = new FormData()
    data.append('file', file)
    data.append('model', 'whisper-1')

    setFormData(data)
  }

  useEffect(() => {
    initializer('audio')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recorder, formData, setBlob, updateFormData }
}
