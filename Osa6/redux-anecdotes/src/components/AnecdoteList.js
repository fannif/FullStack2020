import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(showNotification(`You voted for ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      )}
    </div>
  )
}

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
    )
}

export default AnecdoteList