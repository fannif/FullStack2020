import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

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


  const additionalInfo =
    <div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button>Like</button></div>
      <div>{blog.user.name}</div>
    </div>

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowAll}>{showAll ? 'Hide' : 'View'}</button>
      {showAll ? additionalInfo : ''}
    </div>
  )
}

export default Blog
