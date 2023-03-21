import React, { Fragment } from 'react'
import { useRecorder } from '../hooks/useRecorder'

interface RecorderProps {
  onEnd: (blob: Blob | undefined) => void;
}

export const Recorder = ({ onEnd }: RecorderProps) => {
  const { recorder } = useRecorder('audio')

  const startRecording = async () => {
    recorder?.startRecording()
  }

  const stopRecording = async () => {
    await recorder?.stopRecording()
    const blob = await recorder?.getBlob()
    onEnd(blob)
  }

  return (
    <Fragment>
      <button onClick={startRecording}> Start recording</button>
      <button onClick={stopRecording}> Stop recording</button>
    </Fragment>
  )
}
