import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({text:null, type:'notify'})
  const [addVisible, setAddVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({text:'Successfully logged in', type:'notify'})
      setTimeout(() => {
        setMessage({text:null, type:'notify'})
      }, 5000)
    } catch (exception) {
      setMessage({text:'Wrong username or password', type:'error'})
      setTimeout(() => {
        setMessage({text:null, type:'notify'})
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBloglistUser') 
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
      setMessage({text:'Successfully logged out', type:'notify'})
      setTimeout(() => {
        setMessage({text:null, type:'notify'})
      }, 5000)
    } catch (exception) {
      setMessage({text:'Logout failed', type:'error'})
      setTimeout(() => {
        setMessage({text:null, type:'notify'})
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAddVisible(false)
        setMessage({text:`A new blog ${blogObject.title} by ${blogObject.author} added`, type:'notify'})
        setTimeout(() => {
          setMessage({text:null, type:'notify'})
        }, 5000) 
      }).catch(error => {
        setMessage({text:`Error adding new blog. Blog must have title and url.`, type:'error'})
          setTimeout(() => {
          setMessage({text:null, type:'notify'})
        }, 5000)
      })
  }

  const blogView = () => (
    <div>
      <h2>Blogs</h2>
      <div>{signOutForm()}</div>
      <p></p>
      <h3>Create new</h3>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const signOutForm = () => (
    <form onSubmit = {handleLogOut}>
      {user.name} logged in <button type="submit">Logout</button>
    </form>
  )
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to the application</h2>
      <div>
        Username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div> 
        Password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">Login</button>
    </form>      
  )

  const blogForm = () => {
    const hideVisible = { display: addVisible ? 'none' : '' }
    const showVisible = { display: addVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideVisible}>
          <button onClick={() => setAddVisible(true)}>New blog</button>
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
      <Notification message = {message} />
      {user === null ? loginForm() : blogView()}
    </div>
  )
}

const Notification = (props) => {
  if (props.message.text === null) {
    return null
  }
  return (
    <div className = {props.message.type}>{props.message.text}</div>
  )
}

export default App