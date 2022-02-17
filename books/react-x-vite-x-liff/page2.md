---
title: "環境構築"
---

## Gitpod を利用する

この度、開発環境として [Gitpod](https://www.gitpod.io/) を利用します。

![](https://i.imgur.com/YwYpybr.jpg)

いわゆる Web ブラウザで気軽に開発できる IDE (統合開発環境) です。

Public リポジトリなら無料で利用でき Private リポジトリも [有料](https://www.gitpod.io/pricing/) で利用できる。

:::message
- 月の利用上限が 50 時間までです。
:::

### GitPod の拡張を導入する

GitPod の拡張を利用すれば楽です。 Google Chrome にて、[gitpod](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki) の拡張を追加します。

### GitPod を追加する

[https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1](https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1) にアクセスし、GitPod に追加します。

<!-- TODO: branch の説明をする -->

![](/images/github-liff-vote-project.png)

Github からログインし、プロジェクトを作成します。

なお、こちら [GitPod 実行用 URL](https://gitpod.io/#https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1) からも進められます。

https://gitpod.io/#https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1

---
<!-- TODO: サーバー閉じてしまった場合の復帰方法-->

---

サーバーの起動が完了したら、左のタブから公開設定を `public` にし、ブラウザを開きます。

![](/images/check-gitlab-setting.png =250x)

開いたページの URL をコピーして、 LINE の LIFF URL に登録します。


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
