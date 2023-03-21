import { useState } from 'react'

export const useRecorderForm = () => {
  const [_, setBlob] = useState<Blob>()

  return { setBlob }
}
