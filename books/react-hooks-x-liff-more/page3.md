---
title: "LINE API (LIFF) の設定"
---

# LINE API (LIFF) の設定

[LINE Developers](https://developers.line.biz/console/) から LINE の設定をしていきます。

## そもそも LIFF とは

> LINE Front-end Framework（LIFF）は、LINE が提供するウェブアプリのプラットフォームです。このプラットフォームで動作するウェブアプリを、LIFF アプリと呼びます。

公式：[ドキュメント > LINE Front-end Framework > LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/)

ブラウザで LINE の機能が使えるフレームワークになります。

以下のようなことを実現できます。

- ユーザー情報
- OS / 言語情報等
- Bot との友達情報
- メッセージ送信（LIFF ブラウザのみ）
- QR スキャン（LIFF ブラウザのみ）

## 初めて利用されるという方は

新規プロバイダーの登録より進めてください。

:::details LINE Developer の登録(初回利用の方のみ)
[#Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/) を参考に 3. まで進めてください。

1. LINE Developers コンソールにログインする
2. 開発者として登録する（初回ログイン時のみ）
3. 新規プロバイダーを作成する
:::

![](/images/create-liff-project.png)

### 新規チャネル作成

下記の情報を登録し、`LINE の規約に同意` を選択し新規チャンネルを作成します。

```
チャネルの種類: LINEログイン
地域: 日本
会社・事業者の所在国・地域: 日本
チャネル名: Vite handson
チャネル説明: Vite handson
アプリタイプ: ウェブアプリ
```

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

また、以下のコマンドを実行して `.env` ファイルを作成します。

```bash
cp .env.example .env
```

`.env` ファイルの `VITE_APP_LIFF_ID` を更新します。

:::message

なお、今回は Firebase を使いません。一番下 `VITE_APP_LIFF_ID` のみ上書き更新していただければ結構です。

:::

```shell:.env
VITE_APP_FIREBASE_KEY="YOUR_VITE_APP_FIREBASE_KEY"
VITE_APP_FIREBASE_DOMAIN="YOUR_VITE_APP_FIREBASE_DOMAIN"
VITE_APP_FIREBASE_PROJECT_ID="YOUR_VITE_APP_FIREBASE_PROJECT_ID"
VITE_APP_FIREBASE_APPID="YOUR_VITE_APP_FIREBASE_APPID"
VITE_APP_LIFF_ID="YOUR_VITE_APP_LIFF_ID" # => ここを上書きする
VITE_APP_OPENAI_SECRET="YOUR_VITE_APP_OPENAI_SECRET"
```

LIFF を活用するために、以下の 2 つの設定が必要になる。
- LIFF App を公開する。公開すると他の人もアンケートに答えられる。お試しの場合は開発モードでもテスト可能。
- [`liff.shareTargetPicker()`](https://developers.line.biz/ja/reference/liff/#share-target-picker) を有効にする

![](/images/other-liff-settings.png)
