import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SignInButton } from './SignInButton'

describe('SignInButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SignInButton login={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<SignInButton login={() => {}} />)
    expect(screen.queryAllByText(/SignInButton\.\.\./i)).toBeTruthy()
  })
})
