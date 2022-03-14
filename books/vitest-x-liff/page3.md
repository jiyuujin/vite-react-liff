---
title: "コンポーネントのテストを書く"
---

# コンポーネントのテストを書く

React コンポーネントをテストするには [`@testing-library/react`](https://www.npmjs.com/package/@testing-library/react) を使うことができます。

```bash
# @testing-library/react
npm i -D @testing-library/react
yarn add -D @testing-library/react
```

https://www.npmjs.com/package/@testing-library/react

### スナップショットを撮影する

vitest の `toMatchSnapshot()` を利用してください。

`vitest` を実行した後に、撮影済スナップショットが `__tests__/__snapshots__` 下に作成されていることを確認してください。

:::details 解答例。

### `HelloWorld`

```tsx:__tests__/example.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import HelloWorld from '../src/components/HelloWorld'

describe('HelloWorld component', () => {
  it('Render correctly', () => {
    const { container } = render(<HelloWorld msg={'Hello World'} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

### `Loading`

```tsx:__tests__/example.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Loading } from '../src/components/Loading'

describe('Loading component', () => {
  it('Render correctly', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

### `SendMessagesButton`

```tsx:__tests__/example.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SendMessagesButton } from '../src/components/SendMessagesButton'

describe('SendMessagesButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SendMessagesButton sendMessages={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

### `SignInButton`

```tsx:__tests__/example.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SignInButton } from '../src/components/SignInButton'

describe('SignInButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SignInButton login={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

:::

### 取得済テキストを確認する

[`@testing-library/react`](https://www.npmjs.com/package/@testing-library/react) の `screen.getByText()` を利用してください。

:::details 解答例。

### `HelloWorld`

```tsx:__tests__/example-2.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import HelloWorld from '../src/components/HelloWorld'

describe('HelloWorld component', () => {
  it('the title is visible', () => {
    render(<HelloWorld msg={'Hello World'} />)
    expect(screen.getByText(/Hello World/i)).toBeTruthy()
  })
})
```

### `Loading`

```tsx:__tests__/example-2.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Loading } from '../src/components/Loading'

describe('Loading component', () => {
  it('the title is visible', () => {
    render(<Loading />)
    expect(screen.getByText(/Loading\.\.\./i)).toBeTruthy()
  })
})

```

### `SendMessagesButton`

```tsx:__tests__/example-2.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SendMessagesButton } from '../src/components/SendMessagesButton'

describe('SendMessagesButton component', () => {
  it('the title is visible', () => {
    render(<SendMessagesButton sendMessages={() => {}} />)
    expect(screen.getByText(/Send Messages/i)).toBeTruthy()
  })
})

```

### `SignInButton`

```tsx:__tests__/example-2.spec.tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SignInButton } from '../src/components/SignInButton'

describe('SignInButton component', () => {
  it('the title is visible', () => {
    render(<SignInButton login={() => {}} />)
    expect(screen.getByText(/Sign In With LINE/i)).toBeTruthy()
  })
})
```

:::
