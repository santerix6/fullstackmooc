import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent }  from '@testing-library/react'
import Blog from './Blog'
const user = {
  username : 'santeri',
  name: 'santeri Nuotiomaa'
}

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

test('after click show all details', () => {
  const mockHandler = jest.fn()
  const blog = {
    title: 'testi title',
    author: 'testi author',
    url: 'testi url',
    likes: 4,
    user: user
  }

  const component = render(
    <Blog blog={blog} handleClick={mockHandler} user={user}/>

  )
  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()
  expect(component.container).toHaveTextContent(
    'testi title')
  expect(component.container).toHaveTextContent(
    'testi url'
  )
  expect(component.container).toHaveTextContent(
    4
  )
})
