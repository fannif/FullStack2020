import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = id => {
  const config = { headers: { Authorization: token }, }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const update = (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  console.log(newBlog)
  return request.then(response => response.data)
}

const comment = async (id, comment) => {
  console.log(comment, id, ' service')
  comment = { comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default {
  getAll,
  create,
  remove,
  update,
  setToken,
  comment
}