import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './simpleBlog'

it('renders the title', () => {
  const blog = {
    title: 'hei',
    author: 'simon',
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'hei'
  )
})

it('renders the author', () => {
  const blog = {
    title: 'hei',
    author: 'simon',
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'simon'
  )
})

it('renders the likes', () => {
  const blog = {
    title: 'hei',
    author: 'simon',
    likes: 5
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'blog has 5 likes'
  )
})

it.only('presses like button twice', () => {
  const blog = {
    title: 'hei',
    author: 'simon',
    likes: 5
  }

  const onClick = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={onClick} />)

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(onClick.mock.calls.length).toBe(2)
})
