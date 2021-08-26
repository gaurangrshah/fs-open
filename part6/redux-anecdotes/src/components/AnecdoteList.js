import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList({ anecdotes = [], dispatch }) {
  const handleVote = (id) => {
    dispatch(vote(id));
    dispatch(
      setNotification(
        `You voted for '${anecdotes.find((a) => a.id === id).content}'`,
        5
      )
    );
  };

  return (
    <div className='anecdote-list'>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
