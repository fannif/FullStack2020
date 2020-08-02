import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, editBlog, removeBlog, user }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLike = (event) => {
    event.preventDefault()
    blog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    editBlog(blog)
    setLikes(blog.likes)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    blog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    removeBlog(blog)
  }

  const removeButton = <button id='delete' onClick={deleteBlog}>Remove</button>

  const additionalInfo =
    <div>
      <div>{blog.url}</div>
      <div id='likes'>Likes: {likes} <button id='like' onClick={addLike}>Like</button></div>
      <div>{blog.user.name}</div>
      {user === blog.user.username ? removeButton : ''}
    </div>

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id='toggle-view' onClick={toggleShowAll}>{showAll ? 'Hide' : 'View'}</button>
      {showAll ? additionalInfo : ''}
    </div>
  )
}

Blog.propTypes = {
  removeBlog: PropTypes.func.isRequired,
  editBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
