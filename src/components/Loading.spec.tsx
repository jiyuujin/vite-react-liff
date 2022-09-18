import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Loading } from './Loading'

describe('Loading component', () => {
  it('Render correctly', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<Loading />)
    expect(screen.queryAllByText(/Loading\.\.\./i)).toBeTruthy()
  })
})
