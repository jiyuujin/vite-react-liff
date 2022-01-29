---
title: "環境構築"
---

## GitPodの拡張の導入

Google Chromeにて、[gitpod](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki) の拡張を追加します。

## GitPodの追加

[https://github.com/4geru/liff-vote-project](https://github.com/4geru/liff-vote-project) にアクセスし、GitPodに追加します

![](/images/github-liff-vote-project.png)

:::message
- 月の利用上限が50時間までです。
:::

Githubからログインし、プロジェクトを作成します。

---

ログインが成功すると、下記のようなページが開きます。Terminal からコマンドを実行してサーバーを起動します。

![](/images/gitpod-open.png)

```shell
# npm のバージョンを上げます
npm install -g npm
# 今回の開発に必要なパッケージをインストールします
npm install
npm run start
```

---

サーバーの起動が完了したら、左のタブから公開設定を `public` にし、ブラウザを開きます。

![](/images/check-gitlab-setting.png =250x)
<!-- ![](/images/gitpod-open-window.png) -->

開いたページのURLをコピーして、 LINE の LIFF URL に登録します。

<!-- vite の環境構築 -->

<!-- Web ページが開けるようになる --->