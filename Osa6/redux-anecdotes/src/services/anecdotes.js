import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const create = async (content) => {
    const anecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)

    return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, create, update }