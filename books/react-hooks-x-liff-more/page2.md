---
title: "環境構築"
---

# 環境構築

:::message

なお、手元の環境 (Local 環境) に Node.js 16 系以上の動作することを確認した上で VS Code 上よりご確認いただけますと幸いです。

:::

今回は [StackBlitz](https://developer.stackblitz.com/) を利用します。

![](https://i.imgur.com/bWxkeyY.png)

## StackBlitz とは

いわゆる Web ブラウザで気軽に開発できる IDE (統合開発環境) です。

最近も 2023 年に入って Node.js が Web ブラウザ上で動作する [WebContainers API](https://webcontainers.io/) が公開された。

:::message

public のプロジェクトなら、無料で利用できます。

:::

GitHub からログインし、プロジェクトを作成します。

なお、こちら [StackBlitz 実行用 URL](https://stackblitz.com/github/jiyuujin/template-vite-react/tree/feature/line-event_2023.3) から進められます。

https://stackblitz.com/github/jiyuujin/template-vite-react/tree/feature/line-event_2023.3

---
<!-- TODO: サーバー閉じてしまった場合の復帰方法-->

---

<!-- vite の環境構築 -->

## Vite プロジェクトを作成する

:::message

Gitpod 実行用 URL より始められた方は、既に環境構築を済ませているため、こちらをスキップいただいて構いません。

:::

`npm init vite` コマンドで Vite プロジェクトを作成する。 TypeScript で書くため `react-ts` オプションを選択する。

```bash
# pnpm
pnpm create vite

# npm
npm init vite

# yarn
yarn create vite
```

オプションの例を示します。

```bash
✔ Project name: … vite-project
✔ Select a framework: › react
✔ Select a variant: › react-ts
```

### 依存関係をインストールする

:::message

Gitpod は Web ブラウザ上で開発するため、事前の Node.js 環境構築は不要です。

:::

```bash
#pnpm
pnpm install

# npm
npm install

# yarn
yarn install
```

### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK です。

```bash
# pnpm
pnpm run dev

# npm
npm run dev

# yarn
yarn dev
```

<!-- Web ページが開けるようになる --->

|Gitpod|Localhost|
|:---|:---|
|![](https://i.imgur.com/rR5fo2C.jpg)|![](https://i.imgur.com/iUANZzJ.jpg)|

### `src/main.tsx` を理解する

Web アプリケーションのルートで `src/main.tsx` を読み込みます。

`react-dom` の `render` という API を使います。

```tsx:src/main.tsx
// React 18

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

このとき React v17 と比較して、それ以前で書くべきコードに変更点が存在します。`react-dom/client` の `createRoot` という API を使います。
