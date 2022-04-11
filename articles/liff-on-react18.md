---
title: 'LIFF アプリを React 18 (Vite) で動作させよう'
emoji: '👱🏻‍♀️'
type: 'tech' # tech: 技術記事 / idea: アイデア
topics: ['zenn', 'vite', 'react', 'liff', 'line'] # 5 つまで
publish-on: 2022-04-11
published: true # 下書きは false
---

# 前置き

2022 年 3 月 3 日に [LINE Developer コミュニティ](https://linedevelopercommunity.connpass.com/) 主催の下 [React](https://ja.reactjs.org/) ([Vite](https://ja.vitejs.dev/)) × [LIFF](https://developers.line.biz/ja/docs/liff/overview/) ハンズオンを実施いたしました。

https://linedevelopercommunity.connpass.com/event/237619/

教材は [Zenn book](https://zenn.dev/books) を利用して書いています。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

ハンズオンではビルドツール [Vite](https://ja.vitejs.dev/) を利用して LIFF アプリを製作しました。

代わりに [Next.js](https://nextjs.org/) を利用して LIFF アプリを製作するために、何に対して注意するべきか書かせていただきます。

## React 18 リリース

3 月 30 日に React 本体が、遅れて 4 月 7 日に型定義ファイルもリリースされています。

https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210

先日製作した LIFF アプリは Zenn book の [教材](https://zenn.dev/jiyuujin/books/react-x-vite-x-liff) と合わせ、基本的に React 17 を想定しています。

ですが React 18 でも問題なく動作することを確認しております。

### 注意するべきこと

React 18 に更新する際、その変更差分は大きくないものの、いくつか気を付けたいことがあります。

- `createRoot` への仕様変更
- 暗黙的なコンポーネントにおける Children の扱い
- `useEffect` hook 周辺の挙動に留意
- React 18 の新機能
   - Concurrency モード
   - 自動バッチ処理
   - トランジション (Transition)
   - サーバサイドにおける React Suspense

なお、新機能については別途ブログに書かせていただいております。

https://webneko.dev/posts/migrate-to-react-18

#### `createRoot` への仕様変更

Root DOM 作成 API に変更がありました。

- React 17 までは `ReactDOM.render` を使っていた
- React 18 では `ReactDOM.createRoot` を使う

具体的な差分は [コミットログ](https://github.com/jiyuujin/vite-react-liff/commit/e84f175a38b119ab21eb165ee0faa7a6bf5778a5) をご確認いただければ幸いです。

https://github.com/jiyuujin/vite-react-liff/commit/e84f175a38b119ab21eb165ee0faa7a6bf5778a5

Web アプリケーションのルートで `src/main.tsx` を読み込んでいるでしょうけれど、この変更点は大きいので注意していただければ幸いです。

#### 暗黙的なコンポーネントにおける Children の扱い

Children を実装しているものの、下記暗黙の宣言に依存しているコンポーネントについて、削除される破壊的変更があり注意しなければいけません。

- `React.FunctionComponent`
- `React.Component.Function`

```tsx
interface Props {
  children?: React.ReactNode
}

class SomeClassComponents React.Component<Props> {
  render() {
    return  <div>{this.props.children}</div>
  }
}
const SomeFunctionComponent: React.FunctionComponent<Props> = props => <div>{props.children}</div>
```

この通り場合によっては、これまでの型付けで動かなくなっているケースがあるため、こちらにも注意していただければ幸いです。

なお、自動化された [移行スクリプト](https://github.com/eps1lon/types-react-codemod) があるので、この利用も検討すべきです。

https://github.com/eps1lon/types-react-codemod

#### `useEffect` hook 周辺の挙動に留意

StrictMode を取り入れる動機が、コンポーネントをアンマウントする代わりに、状態を保持することを可能にするため。

この目的を達成するため、コンポーネントをアンマウントするときと同じライフサイクルフックを呼び出しますが、コンポーネントと DOM 要素の両方の状態を保持することになります。

それは、すなわちコンポーネントのマウントとアンマウントを複数回繰り返すことを意味しており、複数回呼び出される可能性のある `useEffect` で `init()` しない方が良いでしょう。

```tsx:src:main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import('@line/liff').then((liff: any) => {
  liff
    .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
    .then(() => {
      const container = document.getElementById('root')
      if (!container) throw new Error('Failed to find the root element')
      createRoot(container).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    })
    .catch((err: any) => {
      console.error({ err })
    })
  })
```

また React 18 の新機能のひとつ Concurrency モードでは、レンダリング作業を分割し、ブラウザのブロックを回避するために作業を一時停止および再開します。

https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

このようにレンダリングの遅い場合が存在することも意味しています。

ライフサイクル周りの挙動に変更が存在する以上、改めてこの辺りを中心に見直しておきたいとも考えている次第です。

## 最後に

LIFF アプリとして動かすにあたり、上記以外の点について特に問題は見受けられないと考えております。

なお、以下リポジトリで React 18 に対応しています。

Zenn book の [教材](https://zenn.dev/jiyuujin/books/react-x-vite-x-liff) と合わせ、いま一度ご確認いただきますと良いものと考えています。

https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.4
