---
title: "LIFF について"
---

# LIFF とは

> LINE Front-end Framework（LIFF）は、LINE が提供するウェブアプリのプラットフォームです。このプラットフォームで動作するウェブアプリを、LIFF アプリと呼びます。

公式：[ドキュメント > LINE Front-end Framework > LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/)

ブラウザで LINE の機能が使えるフレームワークになります。

以下のようなことを実現できます。

- ユーザー情報
- OS / 言語情報等
- Bot との友達情報
- メッセージ送信（LIFF ブラウザのみ）
- QR スキャン（LIFF ブラウザのみ）

## API について

[LIFF ブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) と [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) で使える機能が変わります。

今回使うものには `*` を付けています。

| 関数名 | 機能 | LIFF<br/>ブラウザ | 外部<br/>ブラウザ | メモ |
| :--- | :---- | :---: | :---: | :--- |
| [`liff.getOS()`](https://developers.line.biz/ja/reference/liff/#get-os) | OS の種類の確認 | ○ | ○ | android/ios/web の 3 種類
| [`liff.getLineVersion()`](https://developers.line.biz/ja/reference/liff/#get-line-version) | LINE のバージョンの確認 | ○ | × | 外部ブラウザだと null が返る
| [`liff.isInClient()`](https://developers.line.biz/ja/reference/liff/#is-in-client)* | LIFF ブラウザか否か | ○ | ○ | LIFF ブラウザ true <br/> 外部ブラウザ false
| [`liff.isApiAvailable()`](https://developers.line.biz/ja/reference/liff/#is-api-available)* | 指定した API の利用可否 | ○ | ○ | 例)<br/>`liff.isApiAvailable('shareTargetPicker')`<br/>`liff.isApiAvailable('multipleLiffTransition')`
| [`liff.login()`](https://developers.line.biz/ja/reference/liff/#login)* | LINE ログイン | ○ | ○ |
| [`liff.logout()`](https://developers.line.biz/ja/reference/liff/#logout) | LINE ログアウト | ○ | ○ |
| [`liff.isLoggedIn()`](https://developers.line.biz/ja/reference/liff/#is-logged-in)* | LINE ログイン状態 | ○ | ○ |
| [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile)* | ユーザー情報 | ○ | ○ |
| [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages)* | Bot view に<br/>メッセージを送信 | ○ | × | 1 対 1 のトークルームで起動した<br/>LIFF ブラウザ内でのみ可<br/>※ URI アクションのみ可能
| [`liff.shareTargetPicker()`](https://developers.line.biz/ja/reference/liff/#share-target-picker)* | メッセージのシェアする | △ | × | `liff.isApiAvailable()` で確認する必要あり

## 画面サイズについて

LIFF ブラウザの画面の大きさは `Full`, `Tall`, `Compact` の 3 種類が選択できます。

![](/images/liff-browser-size.png)
