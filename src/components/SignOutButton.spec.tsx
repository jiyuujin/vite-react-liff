import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SignOutButton } from './SignOutButton'

describe('SignOutButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SignOutButton logout={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<SignOutButton logout={() => {}} />)
    expect(screen.queryAllByText(/SignOutButton\.\.\./i)).toBeTruthy()
  })
})
