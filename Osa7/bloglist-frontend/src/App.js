import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList, { User } from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/accountReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [addVisible, setAddVisible] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON))
    }
  }, [dispatch])

  const matchUser = useRouteMatch('/users/:id')
  const linkUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const linkBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : { title:'' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification({ text:'Successfully logged in', type:'notify' }, 5))
    } catch (exception) {
      dispatch(setNotification({ text:'Wrong username or password', type:'error' }, 5))
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      setUsername('')
      setPassword('')
      dispatch(setNotification({ text:'Successfully logged out', type:'notify' }, 5))
    } catch (exception) {
      dispatch(setNotification({ text:'Logout failed', type:'error' }, 5))
    }
  }

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      setAddVisible(false)
      dispatch(setNotification({ text:`A new blog ${blogObject.title} by ${blogObject.author} added`, type:'notify' }, 5))
    } catch (exception) {
      dispatch(setNotification({ text:'Error adding new blog. Blog must have title and url.', type:'error' }, 5))
    }
  }

  const editBlog = (blogObject) => {
    try {
      dispatch(likeBlog(blogObject))
      dispatch(setNotification({ text:`Added a like to blog ${blogObject.title}`, type:'notify' }, 5))
    } catch (exception) {
      dispatch(setNotification({ text:'Error liking the blog.', type:'error' }, 5))
    }
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        dispatch(deleteBlog(blogObject.id))
        dispatch(setNotification({ text:`Deleted ${blogObject.title}`, type:'notify' }, 5))
      } catch (exception) {
        dispatch(setNotification({ text: 'This blog has already been deleted from the server', type:'error' }, 5))
      }
    }
  }

  const listView = () => (
    <div>
      <div>
        {navbar()}
        <h2>Blogs</h2>
        <p></p>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User user={linkUser}/>
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={linkBlog} editBlog={editBlog} removeBlog={removeBlog} user={user.username} />
        </Route>
        <Route path='/'>
          <div>
            <h3>Create new</h3>
            {blogForm()}
            <ul id='blogs'>
              {blogs.map(blog =>
                <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}</div>
              )}
            </ul>
          </div>
        </Route>
      </Switch>
    </div>
  )

  const navbar = () => (
    <form className='nav' onSubmit = {handleLogOut}>
      <Link className='padded' to="/blogs">blogs</Link>
      <Link className='padded' to="/users">users</Link>
      {user.name} logged in <button type="submit">Logout</button>
    </form>
  )

  const loginForm = () => (
    <div>
      <h2>Blogs</h2>
      <LoginForm id='login-form' username={username} password={password} handleLogin={handleLogin}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
      />
    </div>
  )

  const blogForm = () => {
    const hideVisible = { display: addVisible ? 'none' : '' }
    const showVisible = { display: addVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideVisible}>
          <button id='new-blog' onClick={() => setAddVisible(true)}>New blog</button>
        </div>
        <p></p>
        <div style={showVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setAddVisible(false)}>Cancel</button>
        </div>
        <p></p>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {user === null ? loginForm() : listView()}
    </div>
  )
}

export default App