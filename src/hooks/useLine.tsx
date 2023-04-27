import { useEffect, useState } from 'react'
import { assertData } from '../utils/assertData'

export type Status = 'signin' | 'inited'

export const useLine = () => {
  const [liffObject, setLiffObject] = useState<any | null>(null)
  const [status, setStatus] = useState<Status>('signin')

  assertData(liffObject)

  const login = () => {
    liffObject.login({})
  }

  const logout = () => {
    liffObject.logout()
  }

  useEffect(() => {
    if (status === 'inited') return

    import('@line/liff').then((liff: any) => {
      liff
        .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
        .then(() => {
          setLiffObject(liff)
          if (liff.isLoggedIn()) setStatus('inited')
        })
        .catch((err: any) => {
          console.error({ err })
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
