import { useEffect, useState } from 'react'
import liff from '@line/liff/core'
import GetOS from '@line/liff/get-os'
import GetLanguage from '@line/liff/get-language'
import GetLineVersion from '@line/liff/get-line-version'
import IsLoggedIn from '@line/liff/is-logged-in'
import SendMessages from '@line/liff/send-messages'

export type Status = 'signin' | 'inited'

export const useLine = () => {
  const [liffObject, setLiffObject] = useState<any | null>(null)
  const [status, setStatus] = useState<Status>('signin')

  const login = () => {
    liffObject?.login({})
  }

  const logout = () => {
    liffObject?.logout()
  }

  useEffect(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('inited')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    liff.use(new GetOS())
    liff.use(new GetLanguage())
    liff.use(new GetLineVersion())
    liff.use(new IsLoggedIn())
    liff.use(new SendMessages())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
