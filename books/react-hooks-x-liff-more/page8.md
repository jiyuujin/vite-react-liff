---
title: "Vue 3 や Svelte でも LIFF 用カスタムフックを作成する"
---

# LIFF 用カスタムフックの使用 (Vue 3 / Svelte 編)

## カスタムフック作成の方針

第 5 章「カスタムフック化の有意性について」で解説した通り pages コンポーネントから直接、[`@line/liff`](https://www.npmjs.com/package/@line/liff) より提供されている API へアクセスしないことを狙います。

ここで、それぞれの責務に分けることを目指します。

- LIFF 認証 (LIFF オブジェクトなどの取得)
- LIFF プロフィール情報などの取得
- LIFF メッセージの送信

## Vue 3 で LIFF 用カスタムフックを使用する

Vue 3 の [Composition API](https://ja.vuejs.org/guide/extras/composition-api-faq.html) を利用します。

:::message

Vue 2 で LIFF 用カスタムフックを使用するのはそもそも Vue 2 自体、外へドメインロジックを切り出すことに長けていないことが挙げられるため、この場では割愛させていただきます。

:::

### LIFF 認証

[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) と [`liff.logout()`](https://developers.line.biz/ja/reference/liff/#logout) を利用して認証処理 (ログイン・ログアウト) の実現、ログイン状態の取得を目指します。

```ts:src/composables/useLine.ts
import { onMounted, ref } from 'vue'
import liff from '@line/liff'

export type Status = 'signin' | 'inited';

export const useLine = () => {
  const liffObject = ref<any | null>(null)
  const status = ref<Status>('signin')

  assertData(liffObject)

  const login = () => {
    liffObject.value.login({})
  }

  const logout = () => {
    liffObject.value.logout()
  }

  onMounted(() => {
    if (status.value === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        liffObject.value = liff
        if (liff.isLoggedIn()) status.value = 'inited'
      })
      .catch((err: any) => {
        console.error({ err })
      })
  })

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
```

### LIFF プロフィール情報などの取得

[`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) を利用して、プロフィール情報の取得を目指します。

なお、この処理は `liffObject` の取得が前提になっています。

```ts:src/composables/useLineInfo.ts
import { ref } from 'vue'
import { Status } from './useLine'

interface UseLineInfoProps {
  liff: any | null;
  status: Status;
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  const displayName = ref('')
  const pictureUrl = ref('')

  if (status !== 'inited')
    return { profile: { displayName, pictureUrl }, version: '' }

  assertData(liff)

  liff
    .getProfile()
    .then((profile: any) => {
      displayName.value = profile.displayName
      pictureUrl.value = profile.pictureUrl
    })
    .catch((err: any) => {
      console.error({ err })
    })

  const version = liff.getVersion()

  return {
    profile: { displayName, pictureUrl },
    version,
  }
}
```

pages コンポーネントで、作成したカスタムフックを使用します。

LIFF 認証の責務をカスタムフック `useLine()` へ隠蔽させることを、また LIFF プロフィール情報などの取得の責務をカスタムフック `useLineInfo()` へ隠蔽させることを狙います。

```vue:src/App.vue
<script lang="ts" setup>
import { useLine } from './composables/useLine'
import { useLineInfo } from './composables/useLineInfo'

const { liffObject, status, login, logout } = useLine()
const {
  profile: { displayName, pictureUrl },
  language,
  os,
  version,
  lineVersion,
} = useLineInfo({
  liff: liffObject,
  status: status.value,
})
</script>
```

あとは、取得してきた変数を、よしなりに散りばめます。

## Svelte で LIFF 用カスタムフックを使用する

React や Vue 3 と同様に、Svelte でも LIFF 用カスタムフックを使用できます。

### LIFF 認証

[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) と [`liff.logout()`](https://developers.line.biz/ja/reference/liff/#logout) を利用して認証処理 (ログイン・ログアウト) の実現、ログイン状態の取得を目指します。

```ts:src/hooks/useLine.ts
import { onMount } from 'svelte'
import liff from '@line/liff'

export type Status = 'signin' | 'inited'

export const useLine = () => {
  let liffObject: any | null = null
  let status: Status = 'signin'

  assertData(liffObject)

  const login = () => {
    liffObject.login({})
  }

  const logout = () => {
    liffObject.logout()
  }

  onMount(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        liffObject = liff
        if (liff.isLoggedIn()) status = 'inited'
      })
      .catch((err: any) => {
        console.error({ err })
      })
  })

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
```

### LIFF プロフィール情報などの取得

[`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) を利用して、プロフィール情報の取得を目指します。

なお、この処理は `liffObject` の取得が前提になっています。

```ts:src/hooks/useLineInfo.ts
import type { Status } from './useLine'

interface UseLineInfoProps {
  liff: any | null
  status: Status
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  let displayName = ''
  let pictureUrl = ''

  if (status !== 'inited') return { profile: { displayName, pictureUrl }, version: '' }

  assertData(liff)

  liff
    .getProfile()
    .then((profile: any) => {
      displayName = profile.displayName
      pictureUrl = profile.pictureUrl
    })
    .catch((err: any) => {
      console.error({ err })
    })

  const version = liff.getVersion()

  return {
    profile: { displayName, pictureUrl },
    version,
  }
}
```

pages コンポーネントで、作成したカスタムフックを使用します。

LIFF 認証の責務をカスタムフック `useLine()` へ隠蔽させることを、また LIFF プロフィール情報などの取得の責務をカスタムフック `useLineInfo()` へ隠蔽させることを狙います。

```svelte:src/App.svelte
<script lang="ts">
import { useLine } from './hooks/useLine'
import { useLineInfo } from './hooks/useLineInfo'

const { liffObject, status, login, logout } = useLine()
const {
  profile: { displayName, pictureUrl },
  version,
} = useLineInfo({
  liff: liffObject,
  status: status,
})
</script>
```

あとは、取得してきた変数を、よしなりに散りばめます。
