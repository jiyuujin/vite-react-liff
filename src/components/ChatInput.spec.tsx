import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ChatInput } from './ChatInput'

describe('ChatInput component', () => {
  it('Render correctly', () => {
    const { container } = render(<ChatInput onSearch={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<ChatInput onSearch={() => {}} />)
    expect(screen.queryAllByText(/Sign In With LINE/i)).toBeTruthy()
  })
})
