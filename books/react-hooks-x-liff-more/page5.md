---
title: "カスタムフック化の有意性について"
---

# カスタムフック化の有意性

カスタムフックを作成するため、まずは React の基本フックを理解する必要があります。

<!-- そもそも Hooks とは -->

## そもそも Hooks とは

React におけるステート管理は 2018 年に発表され、その後 2019 年にリリースされた Hooks の登場により大きく変わりました。

https://reactjs.org/blog/2019/02/06/react-v16.8.0.html

ステート管理に使われる `useState` や、レンダリングの制御等に使われる `useEffect` を始め、 React 公式の Hooks は下記の通り準備されています。

- 基本フック
  - `useState`
  - `useEffect`
  - `useContext`
- 追加フック
  - `useReducer`
  - `useRef`
  - `useImperativeHandle`
  - `useMemo`
  - `useCallback`
  - `useLayoutEffect`
  - `useDebugValue`

なお、先日 React の新しい [公式ドキュメント](https://react.dev/) がローンチされました。

https://twitter.com/reactjs/status/1636441676506906626?s=20

これまでメインとして使用していたクラスコンポーネントより変わり、関数型コンポーネント (Hooks) を中心に書かれています。

https://react.dev/

また、さらに React の基礎を理解するには昨年執筆した「React (Vite) で LIFF アプリを作ろう」、第 6 章「React hooks について」をご確認いただければ。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

## カスタムフック化の狙い

ひとことでいうと、基本的に `.tsx` で書かれている pages コンポーネントに全てのロジックを盛り込めるもの、責務がそれらに集中してしまう懸念が挙げられます。

ソースコードのメンテナンス性の観点から、ひとつ触る度に余計な修正の発生する可能性があったりすることが多いと考えています。

```
🗂 root
   └ 🗂 src                 : ソースコードのルート
      └ 🗂 components       : コンポーネント集
         └ 🗂 button
         └ 🗂 ..
      └ 🗂 pages            : ページ群
         - 📄 index.tsx     : ルートのパスに入るコンポーネント
```

上の例でいうところの `pages/index.tsx` にロジックを詰め込んだ場合を考えてみましょう。

もちろん、責務がそれに集中してしまう以上、ユニットテストが書きづらくなります。

```
🗂 root
   └ 🗂 src                 : ソースコードのルート
      └ 🗂 components       : コンポーネント集
         └ 🗂 button
         └ 🗂 ..
      └ 🗂 domain           : ドメイン集
         └ 🗂 auth
         └ 🗂 ..
      └ 🗂 pages            : ページ群
         - 📄 index.tsx     : ルートのパスに入るコンポーネント
```

pages コンポーネントに、細々としたロジックを入れないよう、設計を考える必要があります。

また直接、ドメイン並びにコアとなる情報へのアクセスを、一部のコンポーネントに限定させることも、非常に大切な考え方となります。

今回のドメイン情報は [`@line/liff`](https://www.npmjs.com/package/@line/liff) より提供されている API になります。

https://www.npmjs.com/package/@line/liff

ざっと API 一覧を下に示します。

| 関数名 | 機能 | LIFF<br/>ブラウザ | 外部<br/>ブラウザ | メモ |
| :--- | :---- | :---: | :---: | :--- |
| [`liff.getOS()`](https://developers.line.biz/ja/reference/liff/#get-os) | OS の種類の確認 | ○ | ○ | android/ios/web の 3 種類
| [`liff.getLineVersion()`](https://developers.line.biz/ja/reference/liff/#get-line-version) | LINE のバージョンの確認 | ○ | × | 外部ブラウザだと null が返る
| [`liff.isInClient()`](https://developers.line.biz/ja/reference/liff/#is-in-client) | LIFF ブラウザか否か | ○ | ○ | LIFF ブラウザ true <br/> 外部ブラウザ false
| [`liff.isApiAvailable()`](https://developers.line.biz/ja/reference/liff/#is-api-available) | 指定した API の利用可否 | ○ | ○ | 例)<br/>`liff.isApiAvailable('shareTargetPicker')`<br/>`liff.isApiAvailable('multipleLiffTransition')`
| [`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) | LINE ログイン | ○ | ○ |
| [`liff.logout()`](https://developers.line.biz/ja/reference/liff/#logout) | LINE ログアウト | ○ | ○ |
| [`liff.isLoggedIn()`](https://developers.line.biz/ja/reference/liff/#is-logged-in) | LINE ログイン状態 | ○ | ○ |
| [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) | ユーザー情報 | ○ | ○ |
| [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages) | Bot view に<br/>メッセージを送信 | ○ | × | 1 対 1 のトークルームで起動した<br/>LIFF ブラウザ内でのみ可<br/>※ URI アクションのみ可能
| [`liff.shareTargetPicker()`](https://developers.line.biz/ja/reference/liff/#share-target-picker) | メッセージのシェアする | △ | × | `liff.isApiAvailable()` で確認する必要あり

なお、[LIFF ブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) と [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) で使える機能が変わります。

今回、この [`@line/liff`](https://www.npmjs.com/package/@line/liff) より提供されている API へ直接、アクセスするためカスタムフックの作成を目指します。

## 最後に

先日ローンチされた React の新しい [公式ドキュメント](https://react.dev/) でも、カスタムフックについての [記載](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component) があります。

https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component
