import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const highScoreIndex = points.indexOf(Math.max(...points))

  const getRandomIndex = (length) => Math.round(Math.random() * (length - 1))
  const randomIndex = getRandomIndex(anecdotes.length)

  const handleNext = () => {
    // regenerate randomIndex if === selected
    const randomAnecdote = randomIndex === selected ? getRandomIndex(anecdotes.length) : randomIndex
    setSelected(randomAnecdote)
  }

  const handleVote = () => {
    const votes = [...points] // copy current points
    votes[selected] += 1 
    setPoints(votes)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>

      <small>has {points[selected]} votes</small>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
      <h1>anecdote with most votes</h1>
      <p>{anecdotes[highScoreIndex]}</p>
      <small>has {points[highScoreIndex]} votes</small>
    </div>
  )
}

export default App