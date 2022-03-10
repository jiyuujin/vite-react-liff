import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import HelloWorld from '../src/components/HelloWorld'
import { Loading } from '../src/components/Loading'
import { SendMessagesButton } from '../src/components/SendMessagesButton'
import { SignInButton } from '../src/components/SignInButton'

describe('HelloWorld component', () => {
  it('Render correctly', () => {
    const { container } = render(<HelloWorld msg={'Hello World'} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<HelloWorld msg={'Hello World'} />)
    expect(screen.getByText(/Hello World/i)).toBeTruthy()
  })
})

describe('Loading component', () => {
  it('Render correctly', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<Loading />)
    expect(screen.getByText(/Loading\.\.\./i)).toBeTruthy()
  })
})

describe('SendMessagesButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SendMessagesButton sendMessages={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<SendMessagesButton sendMessages={() => {}} />)
    expect(screen.getByText(/Send Messages/i)).toBeTruthy()
  })
})

describe('SignInButton component', () => {
  it('Render correctly', () => {
    const { container } = render(<SignInButton login={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('the title is visible', () => {
    render(<SignInButton login={() => {}} />)
    expect(screen.getByText(/Sign In With LINE/i)).toBeTruthy()
  })
})
