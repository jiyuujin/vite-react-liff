---
title: "チャレンジ課題"
---

<!-- Profile 画像設定 -->

## プロフィール画像を取得する

[`@line/liff`](https://www.npmjs.com/package/@line/liff) の `getProfile()` を利用してください。

![](https://i.imgur.com/MutUtg4.jpg)

:::details 解答例。

`getProfile()` を利用してください。

```tsx
const [pictureUrl, setPictureUrl] = useState<string>('')
liff
  .getProfile()
  .then((profile: any) => {
    setProfileName(profile.displayName)
    setPictureUrl(profile.pictureUrl)
  })
```

回答は [`ver.2022.2` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.2) をご確認いただければ幸いです。

:::

<!-- メッセージ送信 -->
<!-- ※ LINE内のブラウザでしかできなかった気がする -->

## メッセージを送信する

[`@line/liff`](https://www.npmjs.com/package/@line/liff) の `sendMessages()` を利用してください。

![](https://i.imgur.com/HjE8zGv.jpg)

:::details 解答例。

## LINE 内ブラウザから LINE にメッセージを送信する

基本的に LINE 内ブラウザからメッセージを送信します。

`sendMessages()` を利用してください。

```tsx
const sendMessages = async () => {
  await liffObject.sendMessages([
    {
      type: 'text',
      text: 'Hello World',
    },
  ])
}
```

回答は [`ver.2022.3.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.3.1) をご確認いただければ幸いです。
## 外部ブラウザから LINE にメッセージを送信する

`shareTargetPicker()` を利用することで、メッセージを送信します。

LINE アプリ上からアクセスされているかを返す `isInClient()` を利用してください。

```tsx
const sendMessages = async () => {
  const messages = [{ type: 'text', text: 'Hello World' }]
  liffObject.isInClient()
    ? liffObject.sendMessages(messages)
    : liffObject.shareTargetPicker(messages)
   }
```

回答は [`ver.2022.3.2` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.3.2) をご確認いただければ幸いです。

:::
