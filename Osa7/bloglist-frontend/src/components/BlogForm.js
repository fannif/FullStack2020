import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label> Title </Form.Label>
        <Form.Control id='title' value={newTitle} onChange={handleTitleChange} />
        <Form.Label>Author </Form.Label>
        <Form.Control id='author' value={newAuthor} onChange={handleAuthorChange} />
        <Form.Label>Url </Form.Label>
        <Form.Control id='url' value={newUrl} onChange={handleUrlChange} />
        <p></p>
        <Button variant='primary' id='create' type="submit">Create</Button>
        <p></p>
      </Form.Group>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm