---
title: "LIFF 用カスタムフックを作成する"
---

# LIFF 用カスタムフックの使用 (React 編)

## カスタムフック作成の方針

第 5 章「カスタムフック化の有意性について」で解説した通り pages コンポーネントから直接、[`@line/liff`](https://www.npmjs.com/package/@line/liff) より提供されている API へアクセスしないことを狙います。

ここで、それぞれの責務に分けることを目指します。

- LIFF 認証 (LIFF オブジェクトなどの取得)
- LIFF プロフィール情報などの取得
- LIFF メッセージの送信

### LIFF 認証

[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) と [`liff.logout()`](https://developers.line.biz/ja/reference/liff/#logout) を利用して認証処理 (ログイン・ログアウト) の実現、ログイン状態の取得を目指します。

```tsx:src/hooks/useLine.tsx
import { useEffect, useState } from 'react'
import liff from '@line/liff'

export type Status = 'signin' | 'signed';

export const useLine = () => {
  const [liffObject, setLiffObject] = useState<any | null>(null)
  const [status, setStatus] = useState<Status>('signin')

  useEffect(() => {
    if (status === 'signed') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('signed')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = () => {
    liffObject?.login({})
  }

  const logout = () => {
    liffObject?.logout()
  }

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
```

ここで `liffObject` が `null` だった場合、フロントエンドの設計上 Error をスローしなければいけないことは気にかけて欲しいと考えています。

### LIFF プロフィール情報などの取得

[`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) を利用して、プロフィール情報の取得を目指します。

なお、この処理も `liffObject` が `null` だった場合を考慮する必要があり、`liffObject` の取得が前提になっています。

```tsx:src/hooks/useLineInfo.tsx
import { useState } from 'react'
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

  liff
    ?.getProfile()
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
```

status が `'inited'` となっていない場合、liff オブジェクトを取得できる状態になっていません。

これを取得できるようになってから、プロフィール情報を取得することになります。

### LIFF メッセージの送信

[`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages) を利用して、メッセージを送信するのを目指します。

なお、この処理も `liffObject` の取得が前提になっています。

```tsx:src/hooks/useLineMessage.tsx
import { Status } from './useLine'

interface UseLineMessageProps {
  liff: any | null;
  status: Status;
}

export const useLineMessage = ({ liff, status }: UseLineMessageProps) => {
  const sendMessages = async () => {
    if (status !== 'inited') return

    await liff?.sendMessages([
      {
        type: 'text',
        text: 'Hello World',
      },
    ])
  }

  return {
    sendMessages,
  }
}
```

status が `'inited'` となっていない場合、liff オブジェクトを取得できる状態になっていません。

これを取得できるようになってから、メッセージを送信することになります。

::: message

LINE iOS 12.0.0 における `liff.sendMessage()` の挙動に不具合が発生しています。

:::

https://twitter.com/LINE_DEV/status/1481602664115085313

## 作成したカスタムフックの使用

責務をそれぞれのカスタムフックへ隠蔽させることを狙います。

- LIFF 認証 (LIFF オブジェクトなどの取得)
- LIFF プロフィール情報などの取得
- LIFF メッセージの送信

pages コンポーネントで、作成したカスタムフックを使用します。

LIFF 認証の責務をカスタムフック `useLine()` へ隠蔽させることを狙います。

```tsx:src/pages/Top.tsx
// Called useLine()

const { liffObject, status, login, logout } = useLine()
```

LIFF プロフィール情報などの取得の責務をカスタムフック `useLineInfo()` へ隠蔽させることを狙います。

```tsx:src/pages/Top.tsx
// Called useLineInfo()

const {
  profile: { displayName, pictureUrl },
  version,
} = useLineInfo({
  liff: liffObject,
  status,
})
```

LIFF メッセージの送信の責務をカスタムフック `useLineMessage()` へ隠蔽させることを狙います。

```tsx:src/pages/Top.tsx
// Called useLineMessage()

const { sendMessages } = useLineMessage({ liff: liffObject, status })
```

LIFF オブジェクトが取得されている、取得されていない場合に分けます。

```tsx:src/pages/Top.tsx
const Top = () => {
  // LIFF オブジェクトが取得されていない場合
  if (status !== 'inited') {
    return (
      <div></div>
    )
  }

  // LIFF オブジェクトが取得されている場合
  return (
    <div></div>
  )
}
```

この処理は `liffObject` の取得が前提になっています。

- プロフィールの表示名 `displayName`
- プロフィールのアイコン画像 URL `pictureUrl`

```tsx:src/pages/Top.tsx
const Top = () => {
  const {
    profile: { displayName, pictureUrl },
    version,
  } = useLineInfo({
    liff: liffObject,
    status,
  })

  return (
    <div>
      <img src={pictureUrl} alt={`${displayName} logo`} />
      <h2>
        {'You are signed to your account'}
        <SignOutButton logout={logout} />
      </h2>
    </div>
  )
}
```

この処理も `liffObject` の取得が前提になっています。

```tsx:src/pages/Top.tsx
const Top = () => {
  const { sendMessages } = useLineMessage({ liff: liffObject, status })

  return (
    <div>
      <h2>
        <SendMessagesButton sendMessages={sendMessages} />
      </h2>
    </div>
  )
}
```

もちろん、このような責務の分け方以外、さまざまな考え方があります。
