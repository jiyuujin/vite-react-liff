---
title: 'LIFF アプリを Vite 4 (React 18) で動かしてみよう'
emoji: '🐷'
type: 'tech' # tech: 技術記事 / idea: アイデア
topics: ['zenn', 'vite', 'react', 'liff', 'line'] # 5 つまで
publish-on: 2022-12-21
published: true # 下書きは false
---

# 前置き

2022 年 3 月 3 日に [LINE Developer コミュニティ](https://linedevelopercommunity.connpass.com/) 主催の下 [React](https://ja.reactjs.org/) ([Vite](https://ja.vitejs.dev/)) × [LIFF](https://developers.line.biz/ja/docs/liff/overview/) ハンズオンを実施いたしました。

https://linedevelopercommunity.connpass.com/event/237619/

教材は [Zenn book](https://zenn.dev/books) を利用して書いています。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

ハンズオンではビルドツール [Vite](https://ja.vitejs.dev/) を利用して LIFF アプリを製作しました。

今回は、正式リリースされた [Vite 4](https://vitejs.dev/blog/announcing-vite4.html) を下に、先日製作した LIFF アプリを Vite 4 上でも動作させるために、何に対して注意するべきか書かせていただきます。

## Vite の 3 と 4 リリース

今年の 7 月に v3 が、また 12 月に v4 がリリースされています。

https://vitejs.dev/blog/announcing-vite3.html

https://vitejs.dev/blog/announcing-vite4.html

:::message

ビルドの速度が早けりゃ、リリースのサイクルも早い！

:::

先日製作した LIFF アプリは Zenn book の [教材](https://zenn.dev/jiyuujin/books/react-x-vite-x-liff) と合わせ、基本的に Vite 2 を想定しています。

ですが Vite 3 並びに Vite 4 でも問題なく動作することを確認しております。

## Vite 3 で注意するべきこと

Vite 2 から Vite 3 へ移行する際は、下に示したことへ注意する必要があります。

- モダンブラウザ基準の変更
- 設定オプションの変更
- 開発サーバの変更
- glob インポートでの形式変換
- WebAssembly サポート

### モダンブラウザ基準の変更

本番バンドルではモダンな JavaScript のサポートを前提としています。

Vite はデフォルトで [native ES Modules](https://caniuse.com/es6-module) および [native ESM dynamic import](https://caniuse.com/es6-module-dynamic-import) および [`import.meta`](https://caniuse.com/mdn-javascript_statements_import_meta) をサポートするブラウザを対象としています。

- Chrome >= 87
- Firefox >= 78
- Safari >= 13
- Edge >= 88

### 設定オプションの変更

v2 にて非推奨となっていた以下のオプションは削除されました。

- `alias` ([`resolve.alias`](https://ja.vitejs.dev/config/shared-options.html#resolvealias) に置き換え)
- `dedupe` ([`resolve.dedupe`](https://ja.vitejs.dev/config/shared-options.html#resolvededupe) に置き換え)
- `build.base` ([`base`](https://ja.vitejs.dev/config/shared-options.html#base) に置き換え)
- `build.brotliSize` ([`build.reportCompressedSize`](https://ja.vitejs.dev/config/build-options.html#build-reportcompressedsize) に置き換え)
- `build.cleanCssOptions` (Vite は、現在では esbuild を CSS の minify に利用します)
- `build.polyfillDynamicImport` (dynamic import をサポートしていないブラウザのために [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) を利用してください)
- `optimizeDeps.keepNames` ([`optimizeDeps.esbuildOptions.keepNames`](https://ja.vitejs.dev/config/dep-optimization-options.html#optimizedepsesbuildoptions) に置き換え)

### 開発サーバの変更

Vite の開発サーバのデフォルトポートが `5173` に変更されました。

[`server.port`](https://ja.vitejs.dev/config/server-options.html#server-port) を利用することで 3000 に変更できます。

### glob インポートでの形式変換

[glob インポートでの形式変換](https://ja.vitejs.dev/guide/features.html#glob-%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E3%81%A7%E3%81%AE%E5%BD%A2%E5%BC%8F%E3%81%AE%E5%A4%89%E6%8F%9B) は、記法が `{ assert: { type: 'raw' }}` から `{ as: 'raw' }` に変更されました。

```js
// ファイル: /foo/index.js
const modules = import.meta.glob('../foo/*.js')

// 変換後
const modules = {
-  '../foo/bar.js': () => {}
+  './bar.js': () => {}
}
```

このように `import.meta.glob` は、現在のモジュールから相対的になっています。

### WebAssembly サポート

`import init from 'example.wasm'` の記法は、[WebAssembly の ES モジュール統合の提案](https://github.com/WebAssembly/esm-integration) との将来的な衝突を避けるため、廃止されました。

実際に、以前の挙動に似た `?init` を利用できます。

```js
-import init from 'example.wasm'
+import init from 'example.wasm?init'

-init().then((instance) => {
+init().then(({ exports }) => {
  exports.test()
})
```

## Vite 4 で注意するべきこと

Vite 3 から Vite 4 へ移行する際は、下に示したことへ注意する必要があります。

- Rollup 3 の利用
- 開発中に SWC を使用する新しい React プラグイン
- Web ブラウザの互換性
- CSS を文字列としてインポートする
- 環境変数の表記

### Rollup 3 の利用

内部的に Rollup 3 を使っています。

https://github.com/rollup/rollup/releases/tag/v3.0.0

::: message

この更新に伴い、Node.js 14.18.0 が必須となっています。

:::

### 開発中に SWC を使用する新しい React プラグイン

[`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) とは別の React プラグインとして、[`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) が新たに publish されています。

こちらは、ビルド時に ESBuild を使用しながら、開発時には Babel を SWC に置き換えます。

https://github.com/vitejs/vite-plugin-react-swc

### Web ブラウザの互換性

最新の Web ブラウザビルドは Safari 14 で、より広い ES2020 互換性のために、デフォルトでターゲットになりました。

### CSS を文字列としてインポートする

.css デフォルトのエクスポートは非推奨になりました。この場合、インポートされたスタイル `?inline` を発行しないため、クエリサフィックス修飾子を使用する必要があります。

```ts
// NG
import stuff from './global.css?inline'

// OK
import stuff from './global.css?inline'
```

### 環境変数の表記

`dotenv` 16 と `dotenv-expand` 9 (以前は `dotenv` 14 と `dotenv-expand` 5) を使用するようになりました。

新たに、引用符 `"` を設定する必要があります。

```.env
# NG
-VITE_APP=ab#cd`ef

# OK
+VITE_APP="ab#cd`ef"
```

## 最後に

アプリを製作する側にとって Vite の変更によって影響を受ける部分は、ソースコードを見ている限り、あまり少ないものと考えています。

なお、以下リポジトリで Vite 4 に対応しています。

Zenn book の [教材](https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.4.2) と合わせ、いま一度ご確認いただきますと良いものと考えています。

https://github.com/jiyuujin/vite-react-liff/tree/ver.2022.4.2

来年 2023 年も、フロントエンドにおけるビルドツールの一角として Vite の動向を注視したいと考えています。
