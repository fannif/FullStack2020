import axios from 'axios'
const baseUrl = '/api/users'

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { getOne, getAll, create }