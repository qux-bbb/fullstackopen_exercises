import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 11223344,
    user: {username: 'root'}
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title1'
  )
  expect(component.container).toHaveTextContent(
    'author1'
  )
  expect(component.container).not.toHaveTextContent(
    'url1'
  )
  expect(component.container).not.toHaveTextContent(
    '11223344'
  )
})

test('show blog detail', () => {
  const blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 11223344,
    user: {username: 'root'}
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'url1'
  )

  expect(component.container).toHaveTextContent(
    '11223344'
  )
})