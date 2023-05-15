---
title: "チャレンジ課題 (ChatGPT を使ってみよう)"
---

# チャレンジ課題

:::message

[2023/05/17](https://linedevelopercommunity.connpass.com/event/282093/) に開催されるハンズオンイベントでは [ChatGPT](https://openai.com/blog/chatgpt) を解説する時間までは作れない見通しになります。

:::

今回もチャレンジ課題を準備しました。

下記マイルストーンに沿って、チャレンジ課題を進めてみましょう。

- `<textarea>` をベースにしたコンポーネントを作成する
- ChatGPT の API 実行できる環境を整備する
   - 環境変数を設定する
   - ChatGPT の API を実行した結果へ反映する
   - `<textarea>` よりユーザーの入力した値を取得、それを受け取る

なお、ChatGPT の API へアクセスするカスタムフックは `useChatCompletion()` とします。

## 解答例

下記マイルストーンに沿って、解答例を示してみます。

- `<textarea>` をベースにしたコンポーネントを作成する
- ChatGPT の API 実行できる環境を整備する
- ChatGPT の API 実行できる環境を整備する
   - 環境変数を設定する
   - ChatGPT の API を実行した結果へ反映する
   - `<textarea>` よりユーザーの入力した値を取得、それを受け取る

### `<textarea>` をベースにしたコンポーネントを作成する

まずは `<textarea>` を作成します。

|Standard|Focused|
|:---|:---|
|![](https://i.imgur.com/IEPBQWZ.png)|![](https://i.imgur.com/WJojfua.png)|

`<textarea>` に必要な `ChatInput` コンポーネントと、送信用ボタンのアイコンを作成する必要があります。

- `ChatInput` コンポーネントを作成する
- 送信用ボタンのアイコンを作成する

#### `ChatInput` コンポーネントを作成する

`ChatInput` コンポーネントとして `src/components/ChatInput.tsx` を作成します。

実際 `ChatInput` コンポーネントにおける props の型定義に HTML 標準の `HTMLTextAreaElement` を利用します。

:::details 解答例。

```tsx:src/components/ChatInput.tsx
import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as Carbon } from '../assets/carbon.svg'

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div className="flex gap-1">
      <textarea {...rest} onChange={onChange} rows={rows} />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  )
}
```

:::

スタイルに Tailwind CSS を充てると、下のように書けます。

:::details 解答例。

```tsx:src/components/ChatInput.tsx
import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as Carbon } from '../assets/carbon.svg'

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div className="flex gap-1">
      <textarea
        {...rest}
        onChange={onChange}
        rows={rows}
        className="grid border border-solid border-purple-500 focus:border-purple-700 text-black font-bold relative w-full rounded py-2 px-4"
      />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  )
}
```

:::

#### 送信用ボタンのアイコンを作成する

`<textarea>` の右には、送信用ボタンとして SVG アイコンを使用します。

![](https://i.imgur.com/OCX2gWO.png)

実際 Vite + React 上でこのような SVG アイコンを使用するため、[`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr) をインストールする必要があります。

```bash
# pnpm
pnpm install -D vite-plugin-svgr

# npm
npm i -D vite-plugin-svgr

# yarn
yarn add -D vite-plugin-svgr
```

https://www.npmjs.com/package/vite-plugin-svgr

vite.config.js より [`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr) を読み込みます。

```js:vite.config.js
import svgr from 'vite-plugin-svgr'

export default {
  plugins: [
    react(),
    svgr(), // => ここを追加する
  ],
}
```

これをもって SVG アイコンが React コンポーネントとして読み込まれるようになります。

そして、指定したい箇所に対し `<Carbon />` と書くことで、実際に SVG アイコンが React コンポーネントとして読み込まれるようになります。

```ts
import { ReactComponent as Carbon } from '../assets/carbon.svg'
```

これより解答例になります。

:::details 解答例。

```tsx:src/components/ChatInput.tsx
import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as Carbon } from '../assets/carbon.svg'

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div className="flex gap-1">
      <textarea {...rest} onChange={onChange} rows={rows} />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  )
}
```

:::

スタイルに Tailwind CSS を充てると、下のように書けます。

:::details 解答例。

```tsx:src/components/ChatInput.tsx
import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as Carbon } from '../assets/carbon.svg'

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div className="flex gap-1">
      <textarea
        {...rest}
        onChange={onChange}
        rows={rows}
        className="grid border border-solid border-purple-500 focus:border-purple-700 text-black font-bold relative w-full rounded py-2 px-4"
      />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  )
}
```

:::

## ChatGPT の API 実行できる環境を整備する

OpenAI を使うために OpenAI Console より OPENAI SECRET を発行、作成します。

### 環境変数を設定する

OpenAI Console で作成した OPENAI SECRET を `VITE_APP_OPENAPI_SECRET` に設定します。

```.env
VITE_APP_FIREBASE_KEY="YOUR_VITE_APP_FIREBASE_KEY"
VITE_APP_FIREBASE_DOMAIN="YOUR_VITE_APP_FIREBASE_DOMAIN"
VITE_APP_FIREBASE_PROJECT_ID="YOUR_VITE_APP_FIREBASE_PROJECT_ID"
VITE_APP_FIREBASE_APPID="YOUR_VITE_APP_FIREBASE_APPID"
VITE_APP_LIFF_ID="YOUR_VITE_APP_LIFF_ID"
VITE_APP_OPENAPI_SECRET="YOUR_VITE_APP_OPENAPI_SECRET" # => ここを上書きする
```

API の詳細は [Chat completions 公式](https://platform.openai.com/docs/guides/chat/chat-completions-beta) を確認しながら、その実行を書いてみましょう。

https://platform.openai.com/docs/guides/chat/chat-completions-beta

これより解答例になります。

### ChatGPT の API を実行した結果へ反映する

まずは、カスタムフック `useChatCompletion()` を作成します。

:::details 解答例。

```tsx:src/hooks/useChatCompletion.tsx
const OPENAI_CHAT_COMPLETIONS_API =
  'https://api.openai.com/v1/chat/completions'
const OPENAI_SECRET = import.meta.env.VITE_APP_OPENAI_SECRET

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function useChatCompletion() {
  async function chatCompletions(
    messages: Message[]
  ): Promise<Message | undefined> {
    const body = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    })

    const res = await fetch(OPENAI_CHAT_COMPLETIONS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_SECRET}`,
      },
      body,
    })
    const data = await res.json()

    return data.choices[0].message
  }

  return { chatCompletions }
}
```

:::

### `<textarea>` よりユーザーの入力した値を取得、それを受け取る

続いてフォーム用に、カスタムフック `useChatForm()` を作成します。

:::details 解答例。

```tsx:src/hooks/useChatForm.tsx
import { useState } from 'react'
import { useChatCompletion } from './useChatCompletion'

export function useChatForm() {
  const [answer, setAnswer] = useState('')
  const { chatCompletions } = useChatCompletion()

  async function search(input: string) {
    if (!input) {
      alert('Please input something.')
      return
    }

    const res = await chatCompletions([
      {
        role: 'user',
        content: input,
      },
    ])
    setAnswer(res?.content || '')
  }

  return { answer, search }
}
```

pages コンポーネントの `src/pages/Top.tsx` より作成したカスタムフックを使用することを目指します。

これは ChatGPT のレスポンスを取得する責務をカスタムフック `useChatCompletion()` に隠蔽、もうひとつ作成のカスタムフック `useChatForm()` よりアクセスさせることを狙います。

```ts
const { answer, search } = useChatForm()
```

この処理も `liffObject` の取得が前提になっています。

```tsx:src/pages/Top.tsx
export function Top() {
  const { answer, search } = useChatForm()

  return (
    <div>
      <h2>
        {answer}
        <ChatInput onSearch={search} />
      </h2>
    </div>
  )
}
```

:::

なお後日、個人ブログの記事でも紹介させていただきます。

TBD
