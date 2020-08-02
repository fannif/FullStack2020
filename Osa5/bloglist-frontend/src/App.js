import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text:null, type:'notify' })
  const [addVisible, setAddVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a,b) => b.likes - a.likes))
      console.log(blogs)
    })
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
      setMessage({ text:'Successfully logged in', type:'notify' })
      setTimeout(() => {
        setMessage({ text:null, type:'notify' })
      }, 5000)
    } catch (exception) {
      setMessage({ text:'Wrong username or password', type:'error' })
      setTimeout(() => {
        setMessage({ text:null, type:'notify' })
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
      setMessage({ text:'Successfully logged out', type:'notify' })
      setTimeout(() => {
        setMessage({ text:null, type:'notify' })
      }, 5000)
    } catch (exception) {
      setMessage({ text:'Logout failed', type:'error' })
      setTimeout(() => {
        setMessage({ text:null, type:'notify' })
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
        setAddVisible(false)
        setMessage({ text:`A new blog ${blogObject.title} by ${blogObject.author} added`, type:'notify' })
        setTimeout(() => {
          setMessage({ text:null, type:'notify' })
        }, 5000)
      }).catch(() => {
        setMessage({ text:'Error adding new blog. Blog must have title and url.', type:'error' })
        setTimeout(() => {
          setMessage({ text:null, type:'notify' })
        }, 5000)
      })
  }

  const editBlog = (blogObject) => {
    const id = blogObject.id
    console.log(blogObject)
    blogService
      .update(id, blogObject)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes:blog.likes+1 }).sort((a,b) => b.likes - a.likes))
        setMessage({ text:`Added a like to blog ${blogObject.title}`, type:'notify' })
        setTimeout(() => {
          setMessage({ text:null, type:'notify' })
        }, 5000)
      }).catch(() => {
        setMessage({ text:'Error liking the blog.', type:'error' })
        setTimeout(() => {
          setMessage({ text:null, type:'notify' })
        }, 5000)
      })
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      const id = blogObject.id
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id).sort((a,b) => b.likes - a.likes))
          setMessage({ text:`Deleted ${blogObject.title}`, type:'notify' })
          setTimeout(() => {
            setMessage({ text:null, type:'notify' })
          }, 5000)
        }).catch(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id).sort((a,b) => b.likes - a.likes))
          setMessage({ text:'This blog has already been deleted from the server', type:'error' })
          setTimeout(() => {
            setMessage({ text:null, type:'notify' })
          }, 5000)
        })
    }
  }

  const blogView = () => (
    <div>
      <h2>Blogs</h2>
      <div>{signOutForm()}</div>
      <p></p>
      <h3>Create new</h3>
      {blogForm()}
      <ul id='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} editBlog={editBlog} removeBlog={removeBlog} user={user.username} />
        )}
      </ul>
    </div>
  )

  const signOutForm = () => (
    <form onSubmit = {handleLogOut}>
      {user.name} logged in <button type="submit">Logout</button>
    </form>
  )

  const loginForm = () => (
    <LoginForm id='login-form' username={username} password={password} handleLogin={handleLogin}
      handleUsername={({ target }) => setUsername(target.value)}
      handlePassword={({ target }) => setPassword(target.value)}
    />
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