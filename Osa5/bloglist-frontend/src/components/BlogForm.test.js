import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls prop callback function with correct data', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const titleInput = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: 'Testi Author' }
  })
  fireEvent.change(titleInput, {
    target: { value: 'Testi Title' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'testi.url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Author')
  expect(createBlog.mock.calls[0][0].url).toBe('testi.url')
})