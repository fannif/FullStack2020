import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testi Author',
    url: 'testi.url',
    likes: 0,
    user: {
      username: 'Testi Kayttaja'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'Testi Author'
  )

  expect(component.container).not.toHaveTextContent(
    'testi.url'
  )

  expect(component.container).not.toHaveTextContent('0')
})

test('also renders url and likes if View button is clicked', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testi Author',
    url: 'testi.url',
    likes: 0,
    user: {
      username: 'Testi Kayttaja'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'Testi Author'
  )

  expect(component.container).toHaveTextContent(
    'testi.url'
  )

  expect(component.container).toHaveTextContent('0')
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testi Author',
    url: 'testi.url',
    likes: 0,
    user: {
      username: 'Testi Kayttaja',
      id: 'asdfghjklzxcvbnm'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} editBlog={mockHandler} />
  )


  const button = component.getByText('View')
  fireEvent.click(button)

  const button2 = component.getByText('Like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})