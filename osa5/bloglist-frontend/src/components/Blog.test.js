import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent }  from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from 'C:/Users/Santeri/fullstack/fullstackmooc/osa5/bloglist-frontend/src/services/blogs.js'
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
test('liking something twice makes sure mochfunc is called twice', () => {

  const blog = {
    title: 'testi title',
    author: 'testi author',
    url: 'testi url',
    likes: 4,
    user: user
  }
  const mockerror = jest.fn()
  const mocktype = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} setErrorMessage={mockerror} setMessageType={mocktype} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)
  expect(mockerror.mock.calls.length).toBe(2);

})
test('testing the form and that it calls the function with proper values', () => {
  const create = jest.fn()
  const mockerror = jest.fn()
  const mocktype = jest.fn()
  const component = render(
    <BlogForm create={create} setErrorMessage={mockerror} setMessageType={mocktype} / >

  )
  component.debug()
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, {
    target: {value: 'testi title'}
  })
  fireEvent.change(author, {
    target: {value: 'testi author'}
  })
  fireEvent.change(url, {
    target: {value: 'testi url'}
  })
  fireEvent.submit(form)
  console.log(create.mock.calls[0][0])
  expect(create.mock.calls.length).toBe(1)
  expect(create.mock.calls[0][0].title).toBe('testi title')
  expect(create.mock.calls[0][0].author).toBe('testi author')
  expect(create.mock.calls[0][0].url).toBe('testi url')
})
