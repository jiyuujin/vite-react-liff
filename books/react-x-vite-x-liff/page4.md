---
title: "LINEログインをしよう"
---

<!-- コーディング部分 -->
<!-- もう一ページいるかも -->

## SDK インストール

LINE Front-end Framework (LIFF) を React 上で使うために [`@line/liff`](https://www.npmjs.com/package/@line/liff) をインストールします。

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
