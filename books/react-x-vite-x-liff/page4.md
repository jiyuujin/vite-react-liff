---
title: "LINEログインをしよう"
---

<!-- コーディング部分 -->
<!-- もう一ページいるかも -->

## SDK を使う前に

今回は [react-router](https://reactrouter.com/) を使った SPA アプリを例に取ります。

https://reactrouter.com/

と言うのも LIFF 初期化の一環で `liff.login()` をかける前に URL がエンコードされており、そのままでルーティングされることはありません。

Router の外側で LIFF の初期化を行った上で URL をデコードするとルーティングされます。

### `Router` コンポーネントを作成する

```tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Top = () => import('../pages/Top')
const Error = (() => import('../pages/Error')

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
```

遅延ロードも `Suspense` コンポーネントと合わせ、下記のように書けます。

```tsx
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from '../components/Loading'

const Top = lazy(() => import('../pages/Top'))
const Error = lazy((() => import('../pages/Error'))

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
```

:::details react-router v5 と比較する。

昨年 2021 年の冬に v6 がリリースされました。

これまでに stable なバージョンとして、リリースされていた [`ver.5.2.1`](https://www.npmjs.com/package/react-router/v/5.2.1) と比較してみた違いは、下記の通りです。

- Route が設定の順番に左右されなくなった (現在の URL に最適な Route を自動的に選択できる)
- 直感的に階層構造のパスを設定できる 
- 容易にコードを分割でき、遅延ロードも書きやすくなった 
- これまでの React Router よりもコードをコンパクトに書きやすい 
- バンドルサイズが減少する

```tsx
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Top = () => import('../pages/Top')
const Error = (() => import('../pages/Error')

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```

また、型定義用に `@types/react-router-dom` をインストールする必要は無くなっています。

:::

## SDK をインストールする

Web アプリケーション上で react-router を使う準備が整いました。

次いで LINE Front-end Framework (LIFF) を使うために [`@line/liff`](https://www.npmjs.com/package/@line/liff) をインストールします。

```bash
# @line/liff
npm i @line/liff
yarn add @line/liff
```

https://www.npmjs.com/package/@line/liff

### 環境変数を設定する

LINE Developers で作成した LIFF ID を `VITE_APP_LIFF_ID` に設定します。

```.env
VITE_APP_LIFF_ID=
```

これまで `process.env` で読み取っていた環境変数を ES Modules で読み取れるように `import.meta.env` に変更する必要があります。

```js
const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

export default defineConfig({
  define: viteEnv,
})
```

### LINE ログイン

Root に近い App コンポーネントで `liff.init()` を利用することで LIFF を初期化します。

今回は `useEffect` の第 2 引数である依存関係の配列に何も渡されない場合、コンポーネントの初期レンダリング時に実行されることを利用します。

ここでポイントは 2 つです。

- 初期レンダリング時に `liff.init()` が呼び出されます
- 先と同じタイミングに LIFF が保持されます

そして `liff.isLoggedIn()` を使った判定により、既に LINE ログインを果たしていた場合は、再度 `liff.init()` しないようにします。

ソースコードは下記の通りです。

```tsx
const [liffObject, setLiffObject] = useState<any>(null)

useEffect(() => {
  import('@line/liff').then((liff: any) => {
    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) {
          // ログインの確認を取れたら
        }
      })
      .catch((err: any) => {
        console.error({ err })
      })
  })
}, [])
```

また LIFF がちゃんと初期化できているかを判定してくれる API があります。

`ready` とそれに伴うコールバック関数を利用してください。

```tsx
useEffect(() => {
  liff.ready.then(() => {
    if (liff.isLoggedIn()) {
      const context = liff.getContext()
      const liffToken = liff.getAccessToken()
      setUid(context.userId)
      setAccessToken(liffToken)
    } 
  })
}, [])
```
