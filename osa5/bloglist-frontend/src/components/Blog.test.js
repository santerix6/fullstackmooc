import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'testi title',
    author: 'testi author',
    url: 'testi url',
    likes: 4
  }
  const component = render(
    <Blog blog={blog}/>
  )
  component.debug()
  expect(component.container).toHaveTextContent(
    'testi title')
  expect(component.container).not.toHaveTextContent(
    'testi url'
  )
  expect(component.container).not.toHaveTextContent(
    4
  )
})
