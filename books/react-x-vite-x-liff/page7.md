---
title: "LIFF について"
---

## LIFF とは

> LINE Front-end Framework（LIFF）は、LINEが提供するウェブアプリのプラットフォームです。このプラットフォームで動作するウェブアプリを、LIFFアプリと呼びます。

公式：[ドキュメント > LINE Front-end Framework > LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/)

- ブラウザで LINE の機能が使えるフレームワークです。
  - ユーザー情報
  - OS/言語情報等
  - Bot との友達情報
  - メッセージ送信（LINE 内ブラウザのみ）
  - QR スキャン（LINE 内ブラウザのみ）

## APIについて

[LIFFブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) と [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) で使える機能が変わります。
今回使うものにはリンクを貼っています。

| 関数名 | 機能 | LIFF<br/>ブラウザ | 外部<br/>ブラウザ | memo |
| :--- | :---- | :---: | :---: | :--- |
| liff.getOS() | OSの種類の確認 | ○ | ○ | android/ios/web の3種類
| liff.getLineVersion() | LINEのバージョンの確認 | ○ | × | 外部ブラウザだと null が返る
| [liff.isInClient()](https://developers.line.biz/ja/reference/liff/#is-in-client) | LIFFブラウザか否か | ○ | ○ | LIFFブラウザ true <br/> 外部ブラウザ false
| [liff.isApiAvailable()](https://developers.line.biz/ja/reference/liff/#is-api-available) | 指定したAPIの利用可否 | ○ | ○ | 例)<br/>liff.isApiAvailable('shareTargetPicker') <br/>liff.isApiAvailable('multipleLiffTransition')
| [liff.login()](https://developers.line.biz/ja/reference/liff/#login) | LINEログイン | ○ | ○ |
| liff.logout() | LINEログアウト | ○ | ○ |
| [liff.isLoggedIn()](https://developers.line.biz/ja/reference/liff/#is-logged-in) | LINEログイン状態 | ○ | ○ |
| [liff.getProfile()](https://developers.line.biz/ja/reference/liff/#get-profile) | ユーザー情報 | ○ | ○ |
| [liff.sendMessages()](https://developers.line.biz/ja/reference/liff/#send-messages) | Bot viewに<br/>メッセージを送信 | ○ | × | 1対1のトークルームで起動した<br/>LIFFブラウザ内でのみ可<br/>※ URIアクションのみ可能
| [liff.shareTargetPicker()](https://developers.line.biz/ja/reference/liff/#share-target-picker) | メッセージのシェアする | △ | × | liff.isApiAvailable() で確認する必要あり

## 画面サイズについて

LIFF ブラウザの画面の大きさは `Full`, `Tall`, `Compact` の 3 種類が選択できます。

![](/images/liff-browser-size.png)

