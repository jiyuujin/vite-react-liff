---
title: "LINE API(LIFF)の設定"
---

## LINE の設定

[LINE Developers](https://developers.line.biz/console/) から LINE の設定をしていきます。

## 初回利用の方は新規プロバイダーの登録をしてください
:::details LINE Developer の登録(初回利用の方のみ)
[#Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/) を参考に 3. まで進めてください。

1. LINE Developers コンソールにログインする
2. 開発者として登録する（初回ログイン時のみ）
3. 新規プロバイダーを作成する
:::

![](/images/create-liff-project.png)

### LIFF の作成
LINE Login のアカウントを作成したら、 `LIFF` > `ログイン` を選択し、LIFF の情報を記述していきます。

```text
LIFFアプリ名: Vite app
サイズ: Full
エンドポイントURL: gitpod で起動した Web アプリの URL
Scope: ✅ profile ✅ すべてを表示 > chat_message.write
ボットリンク機能: Off
```

の設定で、LIFF アプリを作成します。

![](/images/check-liff-app.png)

作成した LIFF ID を public/index.html の LIFF_ID に登録します。
LIFF URL は LINE のチャットに貼り付けます。

```shell:.env
VITE_APP_FIREBASE_KEY="YOUR_VITE_APP_FIREBASE_KEY"
VITE_APP_FIREBASE_DOMAIN="YOUR_VITE_APP_FIREBASE_DOMAIN"
VITE_APP_FIREBASE_DATABASE="YOUR_VITE_APP_FIREBASE_DATABASE"
VITE_APP_FIREBASE_PROJECT_ID="YOUR_VITE_APP_FIREBASE_PROJECT_ID"
VITE_APP_FIREBASE_STORAGE_BUCKET="YOUR_VITE_APP_FIREBASE_STORAGE_BUCKET"
VITE_APP_FIREBASE_SENDER_ID="YOUR_VITE_APP_FIREBASE_SENDER_ID"
VITE_APP_FIREBASE_APPID="YOUR_VITE_APP_FIREBASE_APPID"
VITE_APP_LIFF_ID="YOUR_VITE_APP_LIFF_ID" # => ここを上書きする
```

LIFF を活用するために、以下の 2 つの設定が必要になる。
- LIFF App を公開する。公開すると他の人もアンケートに答えられる。お試しの場合は開発モードでもテスト可能。
- [シェアターゲットピッカー](https://developers.line.biz/ja/reference/liff/#share-target-picker)を有効にする

![](/images/other-liff-settings.png)


<!-- firebase の設定 -->
https://console.firebase.google.com/

このプロジェクトで Google アナリティクスの有効化 → OFF にする
→ 決定。
