---
title: "はじめに"
---

# ご挨拶

こんにちは。現在 [React](https://ja.reactjs.org/) / [Express](https://github.com/expressjs/express) / [WebSocket](https://github.com/websockets/ws) から構成されている Web サービスの機能開発に、ウェブフロントエンド開発やアクセシビリティの啓蒙を中心に進める jiyuujin と申します。

https://yuma-kitamura.nekohack.me/

<!-- 今回作るアプリについて説明をする -->

<!-- ゴールの画像とやることをまとめる -->
<!-- https://reactjs.nekohack.me/handson/liff_vite.html#vite-%E3%81%A6%E3%82%99-liff-%E3%82%A2%E3%83%95%E3%82%9A%E3%83%AA -->

## React (Vite) で LIFF アプリを作る

今回は [LINE 社](https://linecorp.com/) 提供の [LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) を利用させていただく。実際に [React](https://ja.reactjs.org/) ( [Vite](https://ja.vitejs.dev/) ) 上で、メッセージ送信などの機能を盛り込んだ Web アプリを製作できることを目指します。

この LINE Front-end Framework は [LINE 社](https://linecorp.com/) が提供する Web アプリのプラットフォームで LIFF とも略される。このプラットフォームで動作する Web アプリを LIFF アプリと呼ぶ。

昨年も同じテーマを下に Zenn book の執筆、ハンズオンを開催させていただきました。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

このときと比較すると目指す成果物に変更はありませんが、React におけるカスタムフックの作成をはじめ、より設計術の一端を学習できる教材となっています。

なお、今回も実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [React on Vite](https://vite-react-liff.web.app/) をご確認いただければ幸いです。

|LINE Auth|Signed|
|:---|:---|
|![](https://i.imgur.com/1SD6yfH.jpg)|![](https://i.imgur.com/pqQPnYp.jpg)|

なお、基本的な使い方については公式ドキュメントに詳細な情報が書かれています。この本を通じて React や LIFF の全体像を掴むことができたなら、公式ドキュメントや API リファレンスもぜひ一度読み通してみてください。

<!-- 完成した git のURL を貼っておく -->

## 参照リポジトリ

まずは下記リポジトリをご確認いただければ幸いです。

https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2023.3

### 今回のゴール

今回のゴールとして LINE Front-end Framework を React (Vite) 上で使えることを目指します。

CSS による装飾として、[Tailwind CSS](https://tailwindcss.com/) 利用によるスタイルを装飾しています。

https://github.com/jiyuujin/vite-react-liff

なお、上記リポジトリのホスティングには [Firebase Hosting](https://firebase.google.com/docs/hosting) を利用しています。

#### [`ver.2023.2.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2023.2.1)

OpenAI ([ChatGPT](https://openai.com/blog/chatgpt) の `gpt-3.5-turbo` モデルなど) を使用できる状態に対応している。

#### [`ver.2023.1.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2023.1.1)

ドメインロジックのカスタムフック化に対応している。

#### [`ver.2022.2.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.2.1)

LINE ログイン時にアイコン画像を取得、表示に対応している。

#### [`ver.2022.1.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.1.1)

LINE 認証を実装している。

#### [`ver.2021.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2021.1)

Firebase Auth (Google 認証) を実装している。
