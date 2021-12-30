import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Loading } from '../components/Loading'

const Top = lazy(() => import('../pages/Top'))
const Error = lazy(() => import('../pages/Error'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <Top />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
