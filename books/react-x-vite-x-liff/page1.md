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

実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [React on Vite](https://vite-react-liff.web.app/) をご確認いただければ幸いです。

|LINE Auth|Signed|
|:---|:---|
|![](https://i.imgur.com/1SD6yfH.jpg)|![](https://i.imgur.com/pqQPnYp.jpg)|

なお、基本的な使い方については公式ドキュメントに詳細な情報が書かれています。この本を通じて React や LIFF の全体像を掴むことができたなら、公式ドキュメントや API リファレンスもぜひ一度読み通してみてください。

<!-- 完成した git のURL を貼っておく -->

## 参照リポジトリ

まずは下記リポジトリをご確認いただければ幸いです。

https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1

### 今回のゴール

今回のゴールとして LINE Front-end Framework を React (Vite) 上で使えることを目指します。

特段 CSS による装飾は一切、行いません。

https://github.com/jiyuujin/vite-react-liff

なお、上記リポジトリで [Tailwind CSS](https://tailwindcss.com/) を利用してスタイルを装飾、またホスティングには [Firebase Hosting](https://firebase.google.com/docs/hosting) を利用しています。

#### [`ver.2022.4` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.4)

React 18 に対応している。

#### [`ver.2022.3.2` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.3.2)

`shareTargetPicker` を利用して外部ブラウザで LINE にメッセージを送信する。

#### [`ver.2022.3.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.3.1)

LIFF ブラウザでメッセージを送信する。

#### [`ver.2022.2` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.2)

LINE ログイン時にアイコン画像を表示している。

#### [`ver.2022.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.1)

LINE Front-end Framework を利用して LINE 認証を実装している。

#### [`ver.2021.2` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2021.2)

React Router を [v6](https://remix.run/blog/react-router-v6) に更新している。

#### [`ver.2021.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2021.1)

Firebase Authentication の Google 認証を実装している。
