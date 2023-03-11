import React from 'react'
import { AuthProvider } from '../contexts/UserContext'

export const JoinFirebase = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  return <AuthProvider>{children}</AuthProvider>
}
