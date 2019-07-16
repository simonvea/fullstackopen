import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

describe('test toggle blog info', () => {

  const blog = {
    title: 'hei',
    author: 'simon',
    url: 'www.test.tea',
    user: {
      name: 'simon',
      username: 'vil ikke',
    }
  }

  const user = {
    token: 'etWQEwtt',
    username: 'Simo n',
  }

  it('only renders title and author', () => {

    const component = render(<Blog blog={blog} user={user} />)

    expect(component.container).toHaveTextContent(
      'hei simon'
    )

    const infoDiv = component.container.querySelector('.blog-info')

    expect(infoDiv).toHaveStyle('display: none')
  })

  it.only('toggles more info on click', () => {

    const component = render(<Blog blog={blog} user={user} />)

    const titleDiv = component.container.querySelector('.blog-title')
    const infoDiv = component.container.querySelector('.blog-info')

    fireEvent.click(titleDiv)

    expect(infoDiv).not.toHaveStyle('display: none')

    fireEvent.click(titleDiv)

    expect(infoDiv).toHaveStyle('display: none')
  })


})
