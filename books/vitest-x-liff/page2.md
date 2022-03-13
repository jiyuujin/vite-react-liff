---
title: "環境構築"
---

## Gitpod を利用する

この度、開発環境として [Gitpod](https://www.gitpod.io/) を利用します。

![](https://i.imgur.com/YwYpybr.jpg)

いわゆる Web ブラウザで気軽に開発できる IDE (統合開発環境) です。

Public リポジトリなら無料で利用でき Private リポジトリも [有料](https://www.gitpod.io/pricing/) で利用できる。

:::message
- 月の利用上限が 50 時間までです。
  :::

### GitPod の拡張を導入する

GitPod の拡張を利用すれば楽です。 Google Chrome にて、[gitpod](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki) の拡張を追加します。

### GitPod を追加する

[https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1](https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1) にアクセスし、GitPod に追加します。

<!-- TODO: branch の説明をする -->

![](/images/github-liff-vote-project.png)

Github からログインし、プロジェクトを作成します。

なお、こちら [GitPod 実行用 URL](https://gitpod.io/#https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1) からも進められます。

https://gitpod.io/#https://github.com/jiyuujin/template-vite-react/tree/feature/line-event_2022.1

---
<!-- TODO: サーバー閉じてしまった場合の復帰方法-->

---

サーバーの起動が完了したら、左のタブから公開設定を `public` にし、ブラウザを開きます。

![](/images/check-gitlab-setting.png =250x)

開いたページの URL をコピーして、 LINE の LIFF URL に登録します。


<!-- vite の環境構築 -->

## Vite プロジェクトを作成する

:::message

Gitpod 実行用 URL より始められた方は、既に環境構築を済ませているため、こちらをスキップいただいて構いません。

:::

`npm init vite` コマンドで Vite プロジェクトを作成する。 TypeScript で書くため `react-ts` オプションを選択する。

```bash
# npm
npm init vite

# yarn
yarn create vite
```

オプションの例を示します。

```bash
✔ Project name: … vite-project
✔ Select a framework: › react
✔ Select a variant: › react-ts
```

### 依存関係をインストールする

:::message

Gitpod は Web ブラウザ上で開発するため、事前の Node.js 環境構築は不要です。

:::

```bash
npm install
yarn install
```

### Vitest を起動する

Vitest を使うために [`vitest`](https://www.npmjs.com/package/vitest) をインストールします。

```bash
# vitest
npm i -D vitest
yarn add -D vitest
```

https://www.npmjs.com/package/vitest

### 事前に設定を読み込む

DOM とブラウザ API をモックするため、[happy-dom](https://github.com/capricorn86/happy-dom) と [jsdom](https://github.com/jsdom/jsdom) の両方をサポートしています。

これらは Vitest に付属していません、別途インストールする必要があります。

```bash
# happy-dom
npm i -D happy-dom
yarn add -D happy-dom

# jsdom
npm i -D jsdom
yarn add -D jsdom
```

テストの設定も、ルート直下にある vite.config.js で書きます。

`environment` オプションに happy-dom または jsdom を設定してください。

```js:vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
  },
})
```

#### 事前に jsdom の設定を読み込む

jsdom を設定した場合に [`@testing-library/jest-dom`](https://www.npmjs.com/package/@testing-library/jest-dom) をインストールします。

https://www.npmjs.com/package/@testing-library/jest-dom

`setupTests.ts` で `@testing-library/jest-dom` を読み込みます。

```js:vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
})
```

```ts:setupTests.ts
import '@testing-library/jest-dom'
```

#### テストを実行する

`vitest` を実行します。 [c8](https://github.com/bcoe/c8) を利用することで、カバレッジを作成します。

```json:package.json
{
  "scripts": {
    "test": "vitest",
    "test:w": "vitest -w",
    "test:cov": "vitest --coverage"
  }
}
```

テスト対象は `**.spec(test).tsx` に該当するファイルとなっています。

これが一切、見つからない場合は、エラーでコケることがあります。

```bash
$ vitest

 DEV  v0.6.0 /Users/yuukit/project/vite-react-liff

No test files found

error Command failed with exit code 1.

```
