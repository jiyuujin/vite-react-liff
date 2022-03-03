---
title: "React hooks について"
---

# React とは

数ある JavaScript のフレームワークのひとつに React が存在します。

- [Angular](https://angular.jp/)
- [React](https://ja.reactjs.org/) / [Docs Beta](https://beta.reactjs.org/)
- [Vue](https://jp.vuejs.org/index.html) / [Vue 3](https://v3.vuejs.org/)
- [Svelte](https://svelte.jp/)

React の主な特徴に仮想 DOM や宣言的 UI が挙げられます。これは奇しくも同じ JavaScript のフレームワークのひとつである Vue と共通する特徴で、この公式ドキュメントで React の触りが記載されており、こちらも合わせチェックいただければ幸いです。

https://jp.vuejs.org/v2/guide/comparison.html

React は Virtual DOM をメモリ上に構築します。これは実 DOM とは異なり、実際の DOM ノードへの描画は React が必要に応じて行います。

コンポーネントに状態の変化があれば、その Virtual DOM が差分を検知 ([差分検知](https://ja.reactjs.org/docs/reconciliation.html) ) します。

下記いずれかが変化した場合に、コンポーネントは再描画されます。

- state はコンポーネント内の状態
- props は親コンポーネントから子コンポーネントに渡される値

state に対応する view を作成したり、上に指し示した state と props のいずれかの変更に伴ってコンポーネントを更新、再描画しています。

:::message

「React が宣言的である (Declarative)」と言う話は @sonatard さんの [宣言的 UI](https://speakerdeck.com/sonatard/xuan-yan-de-ui) で分かり易く解説されています。

:::

## React コンポーネントを書く

これまでとりわけ React [v16.8](https://ja.reactjs.org/blog/2019/02/06/react-v16.8.0.html) 以前までは、クラスコンポーネントをベースに書いていました。しかし最近は、関数コンポーネントベースで書くのが常です。

その関数コンポーネントを Hooks と呼び、独立的に再利用、構成、テストも書けます。

:::message

Hooks は React [v16.8](https://ja.reactjs.org/blog/2019/02/06/react-v16.8.0.html) 以降で使えます。

:::

今では React で Hooks を使うのが流行りで、React でコンポーネントを書く際クラスコンポーネントを使う方法と関数コンポーネントを使う方法の 2 種類が存在します。

この内今回の Hooks は後者の範疇に入りますが、まずはクラスコンポーネントを例にとります。

```tsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleCount = this.handleCount.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}
```

Hooks 導入以前まで、関数コンポーネントに state を持たせられなかった代わりに state を持たせるためクラスコンポーネントを実装する他ありませんでした。

### 関数コンポーネントを使うべき理由

主な理由を下記の通りです。クラスコンポーネントでは `this` を用いて state を参照しなければならず、更新する際も state に `this` を用いて参照しなければいけません。

- `this` を使う必要が無くなる
- メソッドを bind する必要が無くなる
- 初期化する `constructor` を書く必要が無くなる

```tsx
const Example = () => {
  const [count, setCount] = React.useState<number>(0);

  function handleClick() {
    setCount(() => count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```

<!-- Hooks とは -->

## Hooks とは

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

#### ステート管理を目的にしている Hooks

ステート管理を目的にしている Hooks は `useState` と `useReducer` です。

`useState` はコンポーネントの state を管理し、また `useReducer` は Redux で使われているパターンをベースに state をまとめて管理する場合に使われます。

なお、 `useReducer` 自身は内部的に `useState` と同じ構造により構成されているため、このあと `useState` を簡単に解説させていただきます。

#### レンダリングの影響を考慮して利用する Hooks

ステート管理とは一線を画す Hooks のひとつに、まずはレンダリングの影響を考慮して利用する `useRef` について、再レンダリングを起こしたくないけど、データを更新させたい場合に有効な Hooks です。

この `useRef` はデータを保持する場合に使われます。

`didMount` や `didUnmount` に限って UI の表示に関係の無いデータを更新するとします。

```tsx
import { useRef, useEffect } from 'react'

const isCalled = useRef(false)
useEffect(() => {
  if (!isCalled.current) {
    isCalled.current = true
  }
}, [])
```

データの更新による再レンダリングが発生しない、またデータが同期的に更新される点から UI の表示に関係の無いデータなら簡単にに取り回すことができます。

一方、再計算に伴うキャッシュを考慮して Hooks を利用する Hooks に `useMemo` や `useCallback` が挙げられます。一度処理した内容をキャッシュしてくれる機能を有します。

この内 `useMemo` は 2 回目以降、初回に処理した内容を計算せず、その結果を呼び出します。

何度実行しても同じ結果しか返さない関数 `filterData` を例に取ります。

```tsx
import { useState, useMemo } from 'react'

const [search, setSearch] = useState()
const [items, setItems] = useState()

const filterData = useMemo(() => {
  if (search) {
    return items.filter(
      (item: { name: string; url: string }) =>
        item.name.indexOf(search) !== -1
      )
  }
  return items
}, [search, items])
```

この場合に `useMemo` は、関数の結果を保持します。また、関数の結果にかかわらず関数そのものを保持する Hooks に `useCallback` が存在します。

あいにく全ての Hooks を紹介する時間は無く、この辺にとどめさせていただきます。

### Hooks の規則

守るべきは主に下記 2 項目です。

- コンポーネントのトップレベル (一番上) で呼び出す
- 関数コンポーネントの中だけで呼び出す

ネストされているループ、条件、または関数内で hooks を呼び出さないよう注意する。このルールに従うことで、コンポーネントのレンダリングされるたびに同じ順序を維持できます。

```tsx
import { useEffect } from 'react'

// NG
if (count !== undefined) {
  useEffect(() => {
    function countForm() {
      localStorage.setItem('formData', count)
    }
  })
}

// OK
useEffect(() => {
  function countForm() {
    if (count !== undefined) {
      localStorage.setItem('formData', count)
    }
  }
})
```

<!-- useState / useEffect / useContext について -->

## 各種 Hooks

今回は `useState` と `useEffect` を中心に見ていきます。

内部構造について前置きで言うと `useState` は `mountState` と `updateState` を見れば良く、また `useEffect` も同様に `mountEffect` と `updateEffect` を見れば良い。

### `useState` について

とりわけ Hooks の中でも一番使われている (と言っても過言ではない) `useState` の目的は、ローカルステートの管理をひとつにしています。

関数コンポーネントの中で `useState` という Hooks を呼び出すと、現在の状態と状態を更新するための関数を返してくれる。状態がまだ存在しない場合は `useState` に渡した値がその状態の初期値として使われます。

```tsx
import { useState } from 'react'

const [count, setCount] = useState(0)
```

### `useEffect` について

`useEffect` はコンポーネントの初期レンダリングを始め、書き手の考えるまま自由自在にレンダリングの制御が可能です。

ひと昔前に書いていたクラスコンポーネントで指し示すところの `componentDidMount` と `componentDidUpdate` を組み合わせたようなものを想像してください。

実際に元の `useEffect` フックと同様のコールバック関数と依存関係の配列を受け入れます。第 2 引数である依存関係の配列に何も渡されないと、コンポーネントの初期レンダリング時に実行されます。

主に下記ケースで `useEffect` を使うことが多い。

- 手動で行う DOM 変更関連の処理
- サーバ API からのデータフェッチの処理
- イベントリスナーによるサブスクリプションの処理

#### カウンタアップを例に取る

具体的にカウンタアップとその DOM 更新を例にとります。

```tsx
import { useEffect, useState } from 'react'

const [count, setCount] = useState(0)

const Component = () => {
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
}
```

DOM を更新して関数コンポーネントは渡した行動を記憶する。そしてその後それを呼び出します。

レンダリングのタイミングを考慮して第 2 引数に依存関係の配列を渡すと、それが変更される度に実行されます。

### `useContext` について

`useContext` は広範囲かつ様々な階層で必要となるデータを保持する場合に使われます。

やっていることを掻い摘んで話すと下記の通りです。

- `createContext` で生成した Context を、状態 (Store) として管理します
- Content の `Provider` で囲み Scope を決定します

ここで管理されている状態 (Store) は `useReducer` で生成した State や Dispatch にあたるものと考えてください。

- Store を利用する際 `useContext` を利用して状態を取得します
- Store に格納した State から状態を読み取ったり、また Store に格納した Dispatch から状態を変更します

では、ソースコードと一緒に見ていきます。

まずは `createContext` で State と Dispatch からなる Context を生成します。

```tsx
type AuthState =
  | {
      state: 'SIGNED_IN'
      currentUser: User
    }
  | {
      state: 'SIGNED_OUT'
    }
  | {
      state: 'UNKNOWN'
    }

type AuthActions =
  | { type: 'SIGN_IN'; payload: { user: User } }
  | { type: 'SIGN_OUT' }

type AuthContextProps = {
  state: AuthState
  dispatch: (value: AuthActions) => void
}

export const AuthContext = createContext<AuthContextProps>({
  state: { state: 'UNKNOWN' },
  dispatch: (val) => {
    //
  },
})
```

なお、下記のように型を定義して Context を生成することを目指します。

- State は `AuthState` の型定義を利用する
- Dispatch は `AuthActions` の型定義を利用する

ここで、生成された状態 (Store) は `useReducer` で生成した State や Dispatch にあたるものと考えてください。

```tsx
import React, { useReducer } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: 'UNKNOWN' })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
```

Content の `Provider` で囲み Scope を決定します。

```tsx
import React from 'react'

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}
```

`AuthProvider` に囲まれている Scope 内で、ユーザ情報を保持できるようになりました。

## 最後に

### `useState` の内側を理解する

簡潔にいうと `useState` の内側では dispatcher の設定とそれに付随して蓄積された更新キューを順に実行しています。

具体的にはブログの記事をご確認いただければ幸いです。

https://webneko.dev/posts/deep-dive-react-usestate

### `useEffect` の内側を理解する

簡潔にいうと `useEffect` の内側では、レンダリングのタイミングを考慮しながら、同じバッチでレンダリングするための更新キューを実行しています。

具体的にはブログの記事をご確認いただければ幸いです。

https://webneko.dev/posts/deep-dive-react-useeffect

### `useContext` の内側を理解する

簡潔にいうと `useContext` の内側では `observedBits` の切り替えが肝となって Context 値を保持しています。

具体的にはブログの記事をご確認いただければ幸いです。

https://webneko.dev/posts/deep-dive-react-usecontext
