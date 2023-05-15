---
title: "Firebase 用カスタムフックを作成する"
---

# Firebase 用カスタムフックの作成

:::message

なお、今回は Firebase を利用しながら、合わせて OAuth 認証するのを目指します。

:::

## カスタムフック作成の方針

第 5 章「カスタムフック化の有意性について」で解説した通り pages コンポーネントから直接、Firebase より提供されている API へアクセスしないことを狙います。

ここで、その責務をひとつのカスタムフックにまとめることを目指します。

### Firebase を利用した OAuth 認証

Firebase の `initializeApp()` を利用して、フロントエンドより Firebase の使える環境を作成します。

```ts:src/plugins/firebase.ts
import { FirebaseApp, initializeApp } from '@firebase/app'
import { getAuth, Auth } from '@firebase/auth'

let firebaseApp: FirebaseApp

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
      authDomain: import.meta.env.VITE_APP_FIREBASE_DOMAIN,
      projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
      appId: import.meta.env.VITE_APP_FIREBASE_APPID,
    })
  } catch (error) {
    console.error({ error })
  }
}

let auth: Auth

export const initialize = () => {
  auth = getAuth(firebaseApp)
  return auth
}
```

Root に近い App コンポーネントで `liff.init()` を利用することで LIFF を初期化します。

`useEffect` の第 2 引数に何も渡されない場合、コンポーネントの初期レンダリング時にコールバック関数が実行されることを利用します。

```tsx:src/hooks/useFirebase.tsx
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { setupFirebase, initialize } from '../plugins/firebase'
import { useSignIn, useSignOut } from '../contexts/UserContext'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

export const useFirebase = () => {
  const provider = new GoogleAuthProvider()
  const [auth, setAuth] = useState<any | undefined>()
  const { signIn } = useSignIn()
  const { signOut } = useSignOut()

  const login = () => {
    signInWithRedirect(auth, provider)
  }

  const logout = () => {
    auth.signOut()
  }

  useEffect(() => {
    setupFirebase()

    const _auth = initialize()
    setAuth(_auth)

    onAuthStateChanged(_auth, (user) => {
      if (user) {
        signIn(user)
      } else {
        signOut()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout }
}
```

pages コンポーネントで、作成したカスタムフックを使用します。

Firebase 認証の責務をカスタムフック `useFirebase()` へ隠蔽させることを狙います。

```tsx:src/App.tsx
import { Main } from './components/Main'
import { useFirebase } from './hooks/useFirebase'

const App = () => {
  useFirebase() // Firebase のセットアップを行います

  return (
    <Main />
  )
}
```

Google 認証した際に Firebase ユーザを Context で保持する方針をとります。

```tsx:src/components/JoinFirebase.tsx
import React from 'react'
import { AuthProvider } from '../contexts/UserContext'

export const JoinFirebase = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  // Context の Provider でラップします
  return <AuthProvider>{children}</AuthProvider>
}
```

保持した Context を利用するため、メインのコンポーネントをラップする必要があります。

```tsx:src/App.tsx
import { Main } from './components/Main'
import { useFirebase } from './hooks/useFirebase'
import { JoinFirebase } from './components/JoinFirebase'

const App = () => {
  useFirebase()

  return (
    // Context (JoinFirebase) でラップする必要があります
    <JoinFirebase>
      <Main />
    </JoinFirebase>
  )
}
```

なお Context と、その基本フック `useContext` の内部構造については、昨年のブログの記事をご確認いただければ幸いです。

https://blog.nekohack.me/posts/deep-dive-react-usecontext
