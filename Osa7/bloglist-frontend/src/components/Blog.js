import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, editBlog, removeBlog, user }) => {
  //const info = useSelector(state => state.info)
  // const dispatch = useDispatch()
  // const toggleShowAll = () => {
  //   if (info.includes(blog.id)) {
  //     dispatch(hideInfo(blog.id))
  //   } else {
  //     dispatch(showInfo(blog.id))
  //   }
  // }

  if (!blog) {
    return null
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

  const removeButton = <Button variant='primary' id='delete' onClick={deleteBlog}>Remove</Button>

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <Button variant='primary' id='like' onClick={addLike}>Like</Button></div>
      <div>Added by {blog.user.name}</div>
      {user === blog.user.username ? removeButton : ''}
    </div>
  )


  // const additionalInfo =
  //   <div>
  //     <div>{blog.url}</div>
  //     <div id='likes'>Likes: {blog.likes} <button id='like' onClick={addLike}>Like</button></div>
  //     <div>{blog.user.name}</div>
  //     {user === blog.user.username ? removeButton : ''}
  //   </div>

  // return(
  //   <div className='blog' style={blogStyle}>
  //     {blog.title} {blog.author} <button id='toggle-view' onClick={toggleShowAll}>{info.includes(blog.id) ? 'Hide' : 'View'}</button>
  //     {info.includes(blog.id) ? additionalInfo : ''}
  //   </div>
  // )
}

Blog.propTypes = {
  removeBlog: PropTypes.func.isRequired,
  editBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
