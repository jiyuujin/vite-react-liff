---
title: "環境構築"
---

## GitPodの拡張の導入

Google Chromeにて、[gitpod](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki) の拡張を追加します。

## GitPodの追加

[https://github.com/jiyuujin/vite-react-liff/tree/ver.2021.2](https://github.com/jiyuujin/vite-react-liff/tree/ver.2021.2) にアクセスし、GitPodに追加します

<!-- TODO: branch の説明をする -->

![](/images/github-liff-vote-project.png)

:::message
- 月の利用上限が50時間までです。
:::

Githubからログインし、プロジェクトを作成します。

---
<!-- TODO: サーバー閉じてしまった場合の復帰方法-->

---

サーバーの起動が完了したら、左のタブから公開設定を `public` にし、ブラウザを開きます。

![](/images/check-gitlab-setting.png =250x)

開いたページのURLをコピーして、 LINE の LIFF URL に登録します。

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

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK です。

```bash
# next dev
npm run dev
yarn dev
```

<!-- Web ページが開けるようになる --->

|Gitpod|Localhost|
|:---|:---|
|![](https://i.imgur.com/rR5fo2C.jpg)|![](https://i.imgur.com/iUANZzJ.jpg)|
