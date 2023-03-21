import { useState, useEffect } from 'react'
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc'

export const useRecorder = (recorderType: RecordRTC.Options['type']) => {
  const [recorder, setRecorder] = useState<
    RecordRTCPromisesHandler | undefined
  >()

  const initializer = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: recorderType,
    })
    setRecorder(recorder)
  }

  useEffect(() => {
    initializer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recorder }
}
