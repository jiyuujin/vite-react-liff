import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from '../components/Loading'

const Top = lazy(() => import('../pages/Top'))
const Error = lazy(() => import('../pages/Error'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
