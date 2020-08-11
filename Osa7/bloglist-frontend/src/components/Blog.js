import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showInfo, hideInfo } from '../reducers/infoReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, editBlog, removeBlog, user }) => {
  const info = useSelector(state => state.info)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowAll = () => {
    if (info.includes(blog.id)) {
      dispatch(hideInfo(blog.id))
    } else {
      dispatch(showInfo(blog.id))
    }
  }

  const addLike = (event) => {
    event.preventDefault()
    blog = { ...blog, user: blog.user.id }
    editBlog(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    blog = { ...blog, user: blog.user.id }
    removeBlog(blog)
  }

  const removeButton = <button id='delete' onClick={deleteBlog}>Remove</button>

  const additionalInfo =
    <div>
      <div>{blog.url}</div>
      <div id='likes'>Likes: {blog.likes} <button id='like' onClick={addLike}>Like</button></div>
      <div>{blog.user.name}</div>
      {user === blog.user.username ? removeButton : ''}
    </div>

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id='toggle-view' onClick={toggleShowAll}>{info.includes(blog.id) ? 'Hide' : 'View'}</button>
      {info.includes(blog.id) ? additionalInfo : ''}
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
