import React, { Fragment } from 'react'
import { useRecorder } from '../hooks/useRecorder'
import { useAudioForm } from '../hooks/useAudioForm'

interface RecorderProps {
  onEnd: (blob: Blob | undefined) => void;
}

export const Recorder = ({ onEnd }: RecorderProps) => {
  const { recorder } = useRecorder()
  const { onSubmit } = useAudioForm()

  const startRecording = async () => {
    recorder?.startRecording()
  }

  const stopRecording = async () => {
    await recorder?.stopRecording()
    const blob = await recorder?.getBlob()
    onEnd(blob)
    onSubmit(blob)
  }

  return (
    <Fragment>
      <button onClick={startRecording}>Start recording</button>
      <button onClick={stopRecording}>Stop recording</button>
    </Fragment>
  )
}
