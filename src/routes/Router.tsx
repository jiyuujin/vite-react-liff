import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { FIREBASE_AUTH } from '../utils/features'

const Top = lazy(() => import('../pages/Top'))
const FireTop = lazy(() => import('../pages/FireTop'))
const Error = lazy(() => import('../pages/Error'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={FIREBASE_AUTH ? <FireTop /> : <Top />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
