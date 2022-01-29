---
title: "LINE API(LIFF)の設定"
---

## LINE の設定

[LINE Developers](https://developers.line.biz/console/) からLINEの設定をしていきます

## 初回利用の方は新規プロバイダーの登録をしてください
:::details LINE Developerの登録(初回利用の方のみ)
[#Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/) を参考に 3. まで進めてください。

1. LINE Developersコンソールにログインする
2. 開発者として登録する（初回ログイン時のみ）
3. 新規プロバイダーを作成する
:::

![](/images/create-liff-project.png)

### LIFF の作成
LINE Loginのアカウントを作成したら、 `LIFF` > `ログイン` を選択し、LIFFの情報を記述していきます。

```text
LIFFアプリ名: アンケートアプリ
サイズ: Full
エンドポイントURL: gitpod で起動した Web アプリの URL
Scope: ✅ profile ✅ すべてを表示 > chat_message.write
ボットリンク機能: Off
```

の設定で、LIFFアプリを作成します。

![](/images/check-liff-app.png)

作成した LIFF ID を public/index.html の LIFF_ID に登録します。
LIFF URL は LINE のチャットに貼り付けます。

```html:public/index.html
    <script>
      // 定数を定義する
      const LIFF_ID = 'LIFF_ID' // <- ここに貼り付ける
      const REQUEST_URL = 'REQUEST_URL'
    </script>
```

LIFF を活用するために、以下の2つの設定が必要になる
- LIFF App を公開する。公開すると他の人もアンケートに答えられる。お試しの場合は開発モードでもテスト可能。
- [シェアターゲットピッカー](https://developers.line.biz/ja/reference/liff/#share-target-picker)を有効にする

![](/images/other-liff-settings.png)

## spreadsheetの作成

[spread sheet](https://docs.google.com/spreadsheets/u/1/d/1gkb9pAB6qb9KdwxelH0kMtZev1XwDJa9qQtav50FUXE/copy) からシートをコピーします

ツール > スクリプトエディタ でスクリプトエディタを開きます。

:::message
- googleに複数ログインしたでは、script editorを開けない場合があります。
- 一度アカウントをログアウトしていただくと解消できる可能性があります。
:::

スクリプトエディタを開いたら、コピーしたGoogle Spread SheetのURLを `SHEET_URL` に貼り付けます。

![](/images/spread-sheet-setup.png)

:::message
- Google Apps Script の URL ではなく Spread Sheet の URL です
:::

初回アクセスの場合は、アプリを承認する必要があるので、承認をします。

![](/images/google-spread-sheet-first-deploy-access.png =450x)

`アクセス承認` を押すと 安全ではないページ にリンクが飛びますが、アクセスし許可をします。

![](/images/google-spread-sheet-first-deploy-not-allowed-url.png =450x)

コピーで作成したシートのURLを `REQUEST_URL` に貼り付け、デプロイをします。

![](/images/google-spread-sheet-first-deploy-after-page.png =450x)

:::message
- デプロイするときは、必ず保存を押してからデプロイを実行してください。
- 2回目以降は、デプロイ > デプロイ管理 > 📝 から バージョンを新しいバージョンに変更し、デプロイをします。
:::

コピーした `REQUEST_URL` は Gitpod の `./public/index.html` の 15行目に貼り付けます。

```html:public/index.html
    <script>
      // 定数を定義する
      const LIFF_ID = 'LIFF_ID'
      const REQUEST_URL = 'REQUEST_URL' // <- ここに貼り付ける
    </script>
```
