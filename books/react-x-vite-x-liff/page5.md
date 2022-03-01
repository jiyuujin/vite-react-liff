---
title: "Vite について"
---

# Vite とは

Vue の作者である Evan You 氏が中心となって開発されているビルドツールで、なお Vite を「ヴィート」と読んでください。

https://vitejs.dev/

## フロントエンドのビルドツール

Vite を使う前に理解しておきたいフロントエンドのビルドツールについて。フロントエンドの世界では広くビルドツールと言われるものが必要です。

JetBrains が取ったアンケートによると、最近 2021 年で Webpack を使っているのがおよそ 7 割いらっしゃった。

https://www.jetbrains.com/lp/devecosystem-2021/javascript/

ひとつの JavaScript ファイルにまとめてくれる代表例が [Webpack](https://github.com/webpack/webpack) と [Vite](https://github.com/vitejs/vite) です。他にも [Rollup](https://github.com/rollup/rollup) や [Parcel](https://github.com/parcel-bundler/parcel) など存在しますが、今回は割愛します。

また Node.js 以外の言語・フレームワークを使って書かれているビルドツールも存在、その内 Rust 製の [swc](https://github.com/swc-project/swc) や Go 製の [esbuild](https://github.com/evanw/esbuild) など一見フロントエンドとは無縁と思われる領域でも新たな存在感を示しています。

こういうビルドツールの中でも Vite は特に 2021 JavaScript Rising Stars など各所で注目を浴びている存在です。

https://risingstars.js.org/2021

:::message
このバンドル以外にさまざまなツールが存在、今回は割愛します。

- 適切なバージョンの JavaScript に変換してくれる Babel と TypeScript
- 素の CSS に変換してくれる SCSS と PostCSS
:::

### React でビルドツールを使う

今回は React を使った Web アプリの製作をテーマに設定しています。

ここで何かと一番使われている Webpack を使ってビルドしても良いのだが、そもそもそれを実務の場面で直接使っているケースは多くありません。

では使うなら Webpack ベースで書かれている create-react-app を使うという選択肢が存在する。それかもしくは、最近ビルドを高速化できるとして何かと注目を浴びている Vite を使うという選択肢が存在します。

- [create-react-app](https://www.npmjs.com/package/create-react-app) (Webpack)
- [Vite](https://www.npmjs.com/package/vite)

[npm トレンド](https://www.npmtrends.com/create-react-app-vs-vite) によると 2021 年 Q2 以降 Vite が create-react-app を上回る日が続いている。

![](https://i.imgur.com/PeYJWbG.jpg)

create-react-app は文字通り、たったひとつのコマンドを実行することで React の Web アプリの雛形を作成できます。

```bash:bash
# JavaScript ベースの React アプリ
npx create-react-app <アプリ名>

# TypeScript ベースの React アプリ
npx create-react-app <アプリ名> --template typescript
```

なお、その詳細についてこの場で説明を省略させていただきますが `react-scripts start` を実行することで React アプリの雛形を起動できます。

そんな create-react-app は Webpack で書かれているフレームワークで、昨年 2021 年 12 月の [v5.0 リリース](https://github.com/facebook/create-react-app/releases/tag/v5.0.0) をもって Webpack v5 サポートを果たしています。

しかし create-react-app の開発速度が依然として低調、また [Vite 2 の React サポート入り](https://vitejs.dev/blog/announcing-vite2.html) も相まってフロントエンドのビルドを Vite にお任せして問題無いのではと考えています。

## Webpack とは

Webpack を少し掘り下げます。 JavaScript でバンドルすることも無かったところに、複数の JavaScript ファイルをひとつの塊としてまとめるため Webpack を使うようになりました。

webpack.config.js を書くことで JavaScript に変換しバンドルします。 `entry` と `output.{path, filename}` を設定することで JavaScript に変換と、それに伴いファイルが生成されています。

```js:webpack.config.js
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                'tsconfig.json'
              ),
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js',
    assetModuleFilename: 'img/[name].[hash:7][ext]',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  devServer: {
    contentBase: __dirname + '/public',
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
}
```

JavaScript に変換するため、ここの肝は TypeScript を Webpack で処理するため [ts-loader](https://github.com/TypeStrong/ts-loader) を使っていること。設定を tsconfig.json と合わせることで、上手く TypeScript のバンドル処理が可能になります。

tsconfig.json の例を下記に示します。

```json:tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true
  }
}
```

JavaScript に限らず CSS ファイルや画像ファイルも含めてひとつにまとめてくれます。

ここでは CSS の `@import` と `url()` を `import` と `require()` のように解釈してくれる [css-loader](https://github.com/webpack-contrib/css-loader) そして CSS 文字列を DOM に挿入する役割を担う [style-loader](https://github.com/webpack-contrib/style-loader) を使っています。

### Webpack の詳細は

詳しくは下記 [リポジトリ](https://github.com/nhld/webpack5-react) をチェックいただければ幸いです。

https://github.com/nekohack-oss/webpack5-react

## Vite とは

ここで漸く、本題の Vite に入ります。

https://vitejs.dev/

Vite を導入してまず得られるメリット、それはビルド高速化です。そして webpack.config.js のような煩わしい記述が不要となります。

ES Modules 形式のまま Web ブラウザからインポートする Dev サーバを搭載し、ソースコードのバンドル無しに高速で動作させるのが特徴です。

この ES Modules は ES2015 を始め JavaScript 標準でモジュール化の機能が搭載されています。

```js
// export
export const hoge = hogehoge

// import
import { hogehoge } from 'hoge'
```

ただし ES2015 非対応の Web ブラウザで動かす場合は Babel というコンパイルツールを使って CommonJS に変換する必要があります。

:::details CommonJS とは。

CommonJS は JavaScript の仕様を定めるプロジェクトでサポートされている構文です。

```js
// export
module.exports = { hogehoge }

// import
const hogehoge = require('hoge')
```

EcmaScript は Web ブラウザ上での JavaScript の仕様を作成しているのに対し CommonJS は Web ブラウザに加えサーバサイドの CUI や GUI で JavaScript を使う際の仕様も作成しています。

:::

### Vite プロジェクトを作成する

`npm init vite` コマンドで Vite プロジェクトを作成する。

```bash:bash
# npm
npm init vite

# yarn
yarn create vite
```

インストールを進めると TypeScript で書くか聞かれます。その問いかけに対しては `react-ts` オプションを選択してください。

#### 依存関係をインストールする

事前に [Node.js 環境構築](https://reactjs.nekohack.me/#node-js-環境構築) が終わっていることを確認します。

```bash:bash
npm install
```

#### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK です。

```bash:bash
# vite dev
npm run dev
```

### カスタマイズ

ルート直下に vite.config.js を作成します。ここで大体カスタマイズできます。

```js:vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  //
})
```

この設定ファイルは ts サポートしているので、代わりに vite.config.ts を作成しても良いです。

#### Vite 上で React を動かす

今回は Vite 上で React の Web アプリを製作するので `@vitejs/plugin-react` をインストールする必要があります。

```bash:bash
# @vitejs/plugin-react
npm install @vitejs/plugin-react
yarn add @vitejs/plugin-react
```

`plugins` プロパティで `@vitejs/plugin-react` を読み込みます。

```js:vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

もちろん vite.config.js では ES Modules で書けます。

#### HTTPS 環境を作る

:::message

Gitpod 実行用 URL より始められた方は、既に環境構築を済ませているため、こちらをスキップいただいて構いません。

:::

Web ブラウザ上で挙動を確認するため HTTPS の環境にデプロイする必要があります。もちろん [Vercel](https://vercel.com/) に代表されるホスティングサービスを利用しても構いません。しかし、いちいちビルドしてから挙動を確認するのも大変面倒臭いので、今回は localhost で HTTPS の環境を準備します。

その環境を構築するため、オレオレ証明書 (certificates) を生成する必要があります。

```bash:bash
openssl req \
   -newkey rsa:2048 \
   -x509 \
   -nodes \
   -keyout localhost.key \
   -new \
   -out localhost.crt \
   -subj /CN=localhost \
   -reqexts SAN \
   -extensions SAN \
   -config <(cat /etc/ssl/openssl.cnf \
       <(printf '[SAN]\nsubjectAltName=DNS:localhost,IP:192.168.0.1')) \
   -sha256 \
   -days 3650
```

これをもってプロジェクトルート直下に下記 2 ファイルが生成されます。

- localhost.crt
- localhost.key

新たに certificates ディレクトリを切ってそこに移動させます。

Node.js 標準で入っている fs の機能と合わせ Vite の [`server.https`](https://vitejs.dev/config/#server-https) を使うことで localhost で HTTPS な Web サーバを立てられます。

```js:vite.config.js
import { defineConfig } from 'vite'
import fs from 'fs'
...
export default defineConfig({
  server: {
    https: {
      cert: fs.readFileSync('./certificates/localhost.pem'),
      key: fs.readFileSync('./certificates/localhost-key.pem')
    }
  }
})
```

最終的に `vite` を実行して HTTPS の Web サーバが起動することを確認してください。

<!-- ファイル構成 -->
