import { useState } from 'react'

export const useRecorderForm = () => {
  const [blob, setBlob] = useState<Blob>()

  return { blob, setBlob }
}
