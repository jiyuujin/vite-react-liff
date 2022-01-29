---
title: "環境構築"
---

<!-- gitpod の設定方法 -->

## Gitpod を利用する

この度、開発環境として [Gitpod](https://www.gitpod.io/) を利用する。

![](https://i.imgur.com/YwYpybr.jpg)

いわゆる Web ブラウザで気軽に開発できる IDE (統合開発環境) です。

Public リポジトリなら無料で利用でき Private リポジトリも [有料](https://www.gitpod.io/pricing/) で利用できる。

### GitPod 実行用 URL

[こちら](https://gitpod.io/#https://github.com/jiyuujin/template-vite-react) より進めてください。

https://gitpod.io/#https://github.com/jiyuujin/template-vite-react

<!-- vite の環境構築 -->

## Vite プロジェクトを作成する

:::message

Gitpod 実行用 URL より始められた方は、既に環境構築を済ませているため、こちらをスキップいただいて構いません。

:::

`npm init vite` コマンドで Vite プロジェクトを作成する。 TypeScript で書くため `react-ts` オプションを選択する。

```bash
# npm
npm init vite

# yarn
yarn create vite
```

### 依存関係をインストールする

:::message

Gitpod は Web ブラウザ上で開発するため、事前の Node.js 環境構築は不要です。

:::

```bash
npm install
yarn install
```

### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK

```bash
# next dev
npm run dev
yarn dev
```

<!-- Web ページが開けるようになる --->

|Gitpod|Localhost|
|:---|:---|
|![](https://i.imgur.com/rR5fo2C.jpg)|![](https://i.imgur.com/iUANZzJ.jpg)|
