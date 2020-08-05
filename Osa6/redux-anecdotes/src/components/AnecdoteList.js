import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )
}

export default AnecdoteList