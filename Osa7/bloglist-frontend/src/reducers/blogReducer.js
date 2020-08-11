/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : { ...blog, likes:blog.likes+1 }).sort((a,b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return [...state, action.data].sort((a,b) => b.likes - a.likes)
  case 'INIT_BLOGS':
    return action.data.sort((a,b) => b.likes - a.likes)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data).sort((a,b) => b.likes - a.likes)
  default: return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    blog = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default blogReducer