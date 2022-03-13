---
title: "はじめに"
---

# ご挨拶

こんにちは。現在 [React](https://ja.reactjs.org/) / [Express](https://github.com/expressjs/express) / [WebSocket](https://github.com/websockets/ws) から構成されている Web サービスの機能開発に、ウェブフロントエンド開発やアクセシビリティの啓蒙を中心に進める jiyuujin と申します。

https://yuma-kitamura.nekohack.me/

<!-- 今回作るアプリについて説明をする -->

## Vitest でテストを書く

[Vitest](https://vitest.dev/) は [Vite](https://ja.vitejs.dev/) によって提供される、非常に高速なユニットテストフレームワークです。

https://vitest.dev/

これまで [Jest](https://jestjs.io/ja/) がユニットテストに採用されていた経緯を考えると、その大半で置き換え可能な、互換性のある API を Vitest は提供しています。

ユニットテストをセットアップする際、必要とされる機能 (スナップショット、モック、カバレッジ) を備えています。また、パフォーマンスを重視しており Worker スレッドを使用して、可能な限り並列に実行しています。

:::message

現在、プロダクションで Vitest の利用は推奨されていません。

:::

<!-- ゴールの画像とやることをまとめる -->

## 参照リポジトリ

まずは下記リポジトリをご確認いただければ幸いです。

https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1

### 今回のゴール

今回のゴールとして Vitest でテストを書けることを目指します。

https://github.com/jiyuujin/vite-react-liff
