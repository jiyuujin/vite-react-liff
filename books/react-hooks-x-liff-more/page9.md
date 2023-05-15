---
title: "LIFF v2.22.0 のプラガブル SDK を利用する"
---

## LIFF v2.22.0

先日 LIFF v2.22.0 が [リリース](https://developers.line.biz/ja/news/2023/03/29/release-liff-2-22-0/) されました。

https://twitter.com/LINE_DEV/status/1640994234697412610?s=20

https://developers.line.biz/ja/news/2023/03/29/release-liff-2-22-0/

LIFF 2.22 の主な特長は、LIFF SDK のファイルサイズを最大約 34％ 削減できるプラガブル SDK 機能となります。

くだけて言うと、使いたい LIFF API に限りインポートさせられるようなりました。

LIFF オブジェクトを初期化する際、必要な API を `@line/liff/core` からインポートします。

```tsx:src/hooks/useLine.tsx
import liff from '@line/liff/core'
```

useLine.tsx の LIFF SDK を読み込む箇所を修正します。

```tsx:src/hooks/useLine.tsx
import liff from '@line/liff'

export const useLine = () => {
  useEffect(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('inited')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

`@line/liff` をインポートする代わりに `@line/liff/core` をインポートします。

```tsx:src/hooks/useLine.tsx
// 代わりに @line/liff/core をインポートする
import liff from '@line/liff/core'

export const useLine = () => {
  useEffect(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('inited')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

LIFF オブジェクトが初期化された際に `liff.use()` を利用します。

```tsx:src/hooks/useLine.tsx
import liff from '@line/liff/core'

// LIFF の API を個別にインポートする
import GetOS from '@line/liff/get-os'
import GetLanguage from '@line/liff/get-language'

// `liff.use()` を利用する
liff.use(new GetOS())
liff.use(new GetLanguage())
```

ちなみに、これまでの LIFF API も引き続き利用できます。

アプリのバンドルサイズを低減させるなど、目に見える形の利益がありますので、こうしたプラガブル SDK を利用するか検討いただければ幸いです。

なお、LIFF v2.22.0 については、先週のブログの記事もご確認いただければ幸いです。

https://blog.nekohack.me/posts/liff-2-22

## 参照

- [プラガブル SDK](https://developers.line.biz/ja/docs/liff/pluggable-sdk/) (Pluggable SDK)
- [LIFF v2.22.0 をリリースしました](https://developers.line.biz/ja/news/2023/03/29/release-liff-2-22-0/)
