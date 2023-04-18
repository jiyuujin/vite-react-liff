import { useState } from 'react'
import { assertData } from '../utils/assertData'
import { Status } from './useLine'

interface UseLineInfoProps {
  liff: any | null;
  status: Status;
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  const [displayName, setDisplayName] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  if (status !== 'inited')
    return { profile: { displayName, pictureUrl }, version: '' }

  assertData(liff)

  liff
    .getProfile()
    .then((profile: any) => {
      setDisplayName(profile.displayName)
      setPictureUrl(profile.pictureUrl)
    })
    .catch((err: any) => {
      console.error({ err })
    })

  const version = liff.getVersion()

  return {
    profile: { displayName, pictureUrl },
    version,
  }
}
